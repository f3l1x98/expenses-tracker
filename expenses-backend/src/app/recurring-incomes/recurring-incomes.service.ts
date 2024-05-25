/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { Repository } from 'typeorm';
import { RecurringIncomeEntity } from './entities/recurring-income.entitiy';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRecurringIncomeDto } from './dto/create-recurring-income.dto';
import { UserEntity } from '../users/entities/user.entity';
import { RecurringIncomeNotFoundException } from './exceptions/recurring-income-not-found';
import { PriceEntity } from '../shared/prices/price.entity';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob, CronTime } from 'cron';
import { IncomesService } from '../incomes/incomes.service';
import { CreateIncomeDto } from '../incomes/dto/create-income.dto';
import { UpdateRecurringIncomeDto } from './dto/update-recurring-income.dto';

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
      incomeDto.category = recurringIncomeEntity.category;
      incomeDto.notes = recurringIncomeEntity.notes;
      incomeDto.price = recurringIncomeEntity.price;
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

    recurringIncome.price = new PriceEntity();
    recurringIncome.price.amount = createRecurringIncomeDto.price.amount;
    recurringIncome.price.currency = createRecurringIncomeDto.price.currency;
    recurringIncome.category = createRecurringIncomeDto.category;
    recurringIncome.notes = createRecurringIncomeDto.notes;
    recurringIncome.user = userId as unknown as UserEntity;
    recurringIncome.cron = createRecurringIncomeDto.cron;
    recurringIncome.startDate = createRecurringIncomeDto.startDate;
    recurringIncome.endDate = createRecurringIncomeDto.endDate;

    const recurringIncomeEntity =
      await this.recurringIncomesRepository.save(recurringIncome);

    this.createRecurringIncomeCronJob(recurringIncomeEntity);

    return recurringIncomeEntity;
  }

  async findAllForUser(userId: string): Promise<RecurringIncomeEntity[]> {
    return this.recurringIncomesRepository.find({
      where: { user: { id: userId } },
    });
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

    if (updateRecurringIncomeDto.category !== undefined) {
      recurringIncome.category = updateRecurringIncomeDto.category;
    }
    if (updateRecurringIncomeDto.notes !== undefined) {
      recurringIncome.notes = updateRecurringIncomeDto.notes;
    }
    if (updateRecurringIncomeDto.price !== undefined) {
      recurringIncome.price = updateRecurringIncomeDto.price;
    }
    if (updateRecurringIncomeDto.cron !== undefined) {
      recurringIncome.cron = updateRecurringIncomeDto.cron;
    }
    if (updateRecurringIncomeDto.endDate !== undefined) {
      recurringIncome.endDate = updateRecurringIncomeDto.endDate;
    }
    if (updateRecurringIncomeDto.startDate !== undefined) {
      recurringIncome.startDate = updateRecurringIncomeDto.startDate;
    }

    const updatedEntity =
      await this.recurringIncomesRepository.save(recurringIncome);

    if (
      updateRecurringIncomeDto.cron !== undefined ||
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
