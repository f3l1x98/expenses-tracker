import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { Repository } from 'typeorm';
import { RecurringIncomeEntity } from './entities/recurring-income.entitiy';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRecurringIncomeDto } from './dto/create-recurring-income.dto';
import { UserEntity } from '../users/entities/user.entity';
import { RecurringIncomeNotFoundException } from './exceptions/recurring-income-not-found';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob, CronTime } from 'cron';
import { IncomesService } from '../incomes/incomes.service';
import { CreateIncomeDto } from '../incomes/dto/create-income.dto';
import { UpdateRecurringIncomeDto } from './dto/update-recurring-income.dto';
import { constructCron } from '../utils/cron-utils';
import { RecurringIncomeFilterDto } from './dto/filter.dto';

@Injectable()
export class RecurringIncomesService implements OnApplicationBootstrap {
  readonly logger = new Logger(RecurringIncomesService.name);

  constructor(
    @InjectRepository(RecurringIncomeEntity)
    private recurringIncomesRepository: Repository<RecurringIncomeEntity>,
    private incomesService: IncomesService,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  async onApplicationBootstrap() {
    const recurringIncomes = await this.recurringIncomesRepository.find();
    for (const recurringIncome of recurringIncomes) {
      this.createRecurringIncomeCronJob(recurringIncome);
    }
  }

  private createRecurringIncomeCronJob(recurringIncome: RecurringIncomeEntity) {
    const job = new CronJob(recurringIncome.cron, async () => {
      this.logger.debug(
        `Executing cron job for recurring income ${recurringIncome.id}`,
      );
      const recurringIncomeEntity =
        await this.recurringIncomesRepository.findOne({
          where: { id: recurringIncome.id },
        });

      if (recurringIncomeEntity === null) {
        this.logger.warn(
          `RecurringIncome with id ${recurringIncome.id} was deleted, but its CronJob is still running!`,
        );
        return;
      }

      const incomeDto = new CreateIncomeDto();
      incomeDto.description = recurringIncomeEntity.description;
      incomeDto.category = recurringIncomeEntity.category;
      incomeDto.amount = recurringIncomeEntity.amount;
      incomeDto.recurringIncome = recurringIncomeEntity;

      await this.incomesService.create(
        recurringIncomeEntity.user.id,
        incomeDto,
      );
    });

    this.schedulerRegistry.addCronJob(recurringIncome.id, job);

    if (
      recurringIncome.startDate === undefined ||
      recurringIncome.startDate.getTime() <= Date.now()
    ) {
      this.logger.log(`Started job with id ${recurringIncome.id}`);
      job.start();
    }
  }

  @Cron('0 2 * * *')
  async checkRecurringIncomeJobs() {
    this.logger.debug('Checking recurring income jobs');
    const recurringIncomes = await this.recurringIncomesRepository.find();
    for (const recurringIncome of recurringIncomes) {
      this.updateJobStatusById(
        recurringIncome.id,
        recurringIncome.startDate,
        recurringIncome.endDate,
      );
    }
  }

  private updateJobStatusById(
    jobId: string,
    startDate: Date | undefined,
    endDate: Date | undefined,
  ) {
    const job = this.schedulerRegistry.getCronJob(jobId);
    const currentDate = Date.now();
    const start = startDate?.getTime() ?? currentDate - 1;
    const end = endDate?.getTime() ?? currentDate + 1;
    const shouldBeRunning = start <= currentDate && end > currentDate;

    if (shouldBeRunning && !job.running) {
      this.logger.log(`Started job with id ${jobId}`);
      job.start();
    } else if (!shouldBeRunning && job.running) {
      this.logger.log(`Started job with id ${jobId}`);
      job.stop();
    }
  }

  async create(
    userId: string,
    createRecurringIncomeDto: CreateRecurringIncomeDto,
  ): Promise<RecurringIncomeEntity> {
    const recurringIncome = new RecurringIncomeEntity();

    recurringIncome.description = createRecurringIncomeDto.description;
    recurringIncome.amount = createRecurringIncomeDto.amount;
    recurringIncome.category = createRecurringIncomeDto.category;
    recurringIncome.user = userId as unknown as UserEntity;
    recurringIncome.cron = constructCron(
      createRecurringIncomeDto.recurringType,
      createRecurringIncomeDto.startDate,
    );
    recurringIncome.recurringType = createRecurringIncomeDto.recurringType;
    recurringIncome.startDate = createRecurringIncomeDto.startDate;
    recurringIncome.endDate = createRecurringIncomeDto.endDate;

    const recurringIncomeEntity =
      await this.recurringIncomesRepository.save(recurringIncome);

    this.createRecurringIncomeCronJob(recurringIncomeEntity);

    return this.findByIdForUser(recurringIncomeEntity.id, userId);
  }

  // TODO unsure if return undefined or throw RecurringIncomeNotFoundException
  async findByIdForUser(
    recurringIncomeId: string,
    userId: string,
  ): Promise<RecurringIncomeEntity | null> {
    const query = this.recurringIncomesRepository
      .createQueryBuilder('recurringIncome')
      .innerJoinAndSelect('recurringIncome.user', 'user')
      .where('recurringIncome.id = :recurringIncomeId', {
        recurringIncomeId,
      })
      .andWhere('user.id = :userId', { userId });
    return query.getOne();
  }

  async findAllForUser(
    userId: string,
    filter: RecurringIncomeFilterDto,
  ): Promise<RecurringIncomeEntity[]> {
    let query = this.recurringIncomesRepository
      .createQueryBuilder('recurringIncome')
      .innerJoinAndSelect('recurringIncome.user', 'user')
      .where('user.id = :userId', { userId })
      .andWhere('recurringIncome.description ILIKE :description', {
        description: `%${filter.description ?? ''}%`,
      });

    if (filter.category !== undefined) {
      query = query.andWhere('recurringIncome.category = :category', {
        category: filter.category,
      });
    }

    if (filter.recurringType !== undefined) {
      query = query.andWhere('recurringIncome.recurringType = :recurringType', {
        recurringType: filter.recurringType,
      });
    }

    if (filter.startDate !== undefined && filter.endDate !== undefined) {
      query = query.andWhere(
        'recurringIncome.createdAt BETWEEN :startDate AND :endDate',
        { startDate: filter.startDate, endDate: filter.endDate },
      );
    } else if (filter.startDate !== undefined) {
      query = query.andWhere('recurringIncome.createdAt >= :startDate', {
        startDate: filter.startDate,
      });
    } else if (filter.endDate !== undefined) {
      query = query.andWhere('recurringIncome.createdAt <= :endDate', {
        endDate: filter.endDate,
      });
    }

    return query.orderBy('recurringIncome.createdAt', 'DESC').getMany();
  }

  async delete(id: string, userId: string) {
    const user = await this.recurringIncomesRepository.findOne({
      where: { user: { id: userId } },
    });

    if (user === null) {
      throw new RecurringIncomeNotFoundException(id);
    }
    await this.recurringIncomesRepository.delete(id);

    this.schedulerRegistry.deleteCronJob(id);
  }

  async update(
    id: string,
    userId: string,
    updateRecurringIncomeDto: UpdateRecurringIncomeDto,
  ): Promise<RecurringIncomeEntity> {
    const recurringIncome = await this.recurringIncomesRepository.findOne({
      where: { id: id, user: { id: userId } },
    });

    if (recurringIncome === null) {
      throw new RecurringIncomeNotFoundException(id);
    }

    if (updateRecurringIncomeDto.description !== undefined) {
      recurringIncome.description = updateRecurringIncomeDto.description;
    }
    if (updateRecurringIncomeDto.category !== undefined) {
      recurringIncome.category = updateRecurringIncomeDto.category;
    }
    if (updateRecurringIncomeDto.amount !== undefined) {
      recurringIncome.amount = updateRecurringIncomeDto.amount;
    }
    if (updateRecurringIncomeDto.endDate !== undefined) {
      recurringIncome.endDate = updateRecurringIncomeDto.endDate;
    }
    if (updateRecurringIncomeDto.startDate !== undefined) {
      recurringIncome.startDate = updateRecurringIncomeDto.startDate;
    }
    if (updateRecurringIncomeDto.recurringType !== undefined) {
      recurringIncome.recurringType = updateRecurringIncomeDto.recurringType;
      recurringIncome.cron = constructCron(
        recurringIncome.recurringType,
        recurringIncome.startDate,
      );
    }

    const updatedEntity =
      await this.recurringIncomesRepository.save(recurringIncome);

    if (
      updateRecurringIncomeDto.recurringType !== undefined ||
      updateRecurringIncomeDto.startDate !== undefined ||
      updateRecurringIncomeDto.endDate !== undefined
    ) {
      this.updateRecurringIncomeCronJob(updatedEntity);
    }

    return updatedEntity;
  }

  private updateRecurringIncomeCronJob(recurringIncome: RecurringIncomeEntity) {
    const job = this.schedulerRegistry.getCronJob(recurringIncome.id);

    const newCronTime = new CronTime(recurringIncome.cron);
    if (job.cronTime !== newCronTime) {
      job.setTime(newCronTime);
    }

    this.updateJobStatusById(
      recurringIncome.id,
      recurringIncome.startDate,
      recurringIncome.endDate,
    );
  }
}
