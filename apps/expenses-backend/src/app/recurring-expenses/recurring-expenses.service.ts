import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { RecurringExpenseEntity } from './entities/recurring-expense.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRecurringExpenseDto } from './dto/create-recurring-expense.dto';
import { UserEntity } from '../users/entities/user.entity';
import { RecurringExpenseNotFoundException } from './exceptions/recurring-expense-not-found';
import { SchedulerRegistry, Cron } from '@nestjs/schedule';
import { CronJob, CronTime } from 'cron';
import { ExpensesService } from '../expenses/expenses.service';
import { CreateExpenseDto } from '../expenses/dto/create-expense.dto';
import { UpdateRecurringExpenseDto } from './dto/update-recurring-expense.dto';
import { constructCron } from '../utils/cron-utils';
import { RecurringExpensesFilterDto } from './dto/filter.dto';

@Injectable()
export class RecurringExpensesService implements OnApplicationBootstrap {
  readonly logger = new Logger(RecurringExpensesService.name);

  constructor(
    @InjectRepository(RecurringExpenseEntity)
    private recurringExpensesRepository: Repository<RecurringExpenseEntity>,
    private expensesService: ExpensesService,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  async onApplicationBootstrap() {
    const recurringExpenses = await this.recurringExpensesRepository.find();
    for (const recurringExpense of recurringExpenses) {
      this.createRecurringExpenseCronJob(recurringExpense);
    }
  }

  private createRecurringExpenseCronJob(
    recurringExpense: RecurringExpenseEntity,
  ) {
    const job = new CronJob(recurringExpense.cron, async () => {
      this.logger.debug(
        `Executing cron job for recurring expense ${recurringExpense.id}`,
      );
      const recurringExpenseEntity =
        await this.recurringExpensesRepository.findOne({
          where: { id: recurringExpense.id },
        });

      if (recurringExpenseEntity === null) {
        this.logger.warn(
          `RecurringExpense with id ${recurringExpense.id} was deleted, but its CronJob is still running!`,
        );
        return;
      }

      const expenseDto = new CreateExpenseDto();
      expenseDto.description = recurringExpenseEntity.description;
      expenseDto.category = recurringExpenseEntity.category;
      expenseDto.amount = recurringExpenseEntity.amount;
      expenseDto.recurringExpense = recurringExpenseEntity;

      await this.expensesService.create(
        recurringExpenseEntity.user.id,
        expenseDto,
      );
    });

    this.schedulerRegistry.addCronJob(recurringExpense.id, job);

    if (
      recurringExpense.startDate === undefined ||
      recurringExpense.startDate.getTime() <= Date.now()
    ) {
      this.logger.log(`Started job with id ${recurringExpense.id}`);
      job.start();
    }
  }

  @Cron('0 2 * * *')
  async checkRecurringExpenseJobs() {
    this.logger.debug('Checking recurring expense jobs');
    const recurringExpenses = await this.recurringExpensesRepository.find();
    for (const recurringExpense of recurringExpenses) {
      this.updateJobStatusById(
        recurringExpense.id,
        recurringExpense.startDate,
        recurringExpense.endDate,
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
    createRecurringExpenseDto: CreateRecurringExpenseDto,
  ): Promise<RecurringExpenseEntity> {
    const recurringExpense = new RecurringExpenseEntity();

    recurringExpense.description = createRecurringExpenseDto.description;
    recurringExpense.amount = createRecurringExpenseDto.amount;
    recurringExpense.category = createRecurringExpenseDto.category;
    recurringExpense.user = userId as unknown as UserEntity;
    recurringExpense.cron = constructCron(
      createRecurringExpenseDto.recurringType,
      createRecurringExpenseDto.startDate,
    );
    recurringExpense.recurringType = createRecurringExpenseDto.recurringType;
    recurringExpense.startDate = createRecurringExpenseDto.startDate;
    recurringExpense.endDate = createRecurringExpenseDto.endDate;

    const recurringExpenseEntity =
      await this.recurringExpensesRepository.save(recurringExpense);

    this.createRecurringExpenseCronJob(recurringExpenseEntity);

    return this.findByIdForUser(recurringExpenseEntity.id, userId);
  }

  // TODO unsure if return undefined or throw RecurringExpenseNotFoundException
  async findByIdForUser(
    recurringExpenseId: string,
    userId: string,
  ): Promise<RecurringExpenseEntity | null> {
    const query = this.recurringExpensesRepository
      .createQueryBuilder('recurringExpense')
      .innerJoinAndSelect('recurringExpense.user', 'user')
      .where('recurringExpense.id = :recurringExpenseId', {
        recurringExpenseId,
      })
      .andWhere('user.id = :userId', { userId });
    return query.getOne();
  }

  async findAllForUser(
    userId: string,
    filter: RecurringExpensesFilterDto,
  ): Promise<RecurringExpenseEntity[]> {
    let query = this.recurringExpensesRepository
      .createQueryBuilder('recurringExpense')
      .innerJoinAndSelect('recurringExpense.user', 'user')
      .where('user.id = :userId', { userId })
      .andWhere('recurringExpense.description ILIKE :description', {
        description: `%${filter.description ?? ''}%`,
      });

    if (filter.category !== undefined) {
      query = query.andWhere('recurringExpense.category = :category', {
        category: filter.category,
      });
    }

    if (filter.recurringType !== undefined) {
      query = query.andWhere(
        'recurringExpense.recurringType = :recurringType',
        {
          recurringType: filter.recurringType,
        },
      );
    }

    if (filter.startDate !== undefined && filter.endDate !== undefined) {
      query = query.andWhere(
        'recurringExpense.createdAt BETWEEN :startDate AND :endDate',
        { startDate: filter.startDate, endDate: filter.endDate },
      );
    } else if (filter.startDate !== undefined) {
      query = query.andWhere('recurringExpense.createdAt >= :startDate', {
        startDate: filter.startDate,
      });
    } else if (filter.endDate !== undefined) {
      query = query.andWhere('recurringExpense.createdAt <= :endDate', {
        endDate: filter.endDate,
      });
    }

    return query.orderBy('recurringExpense.createdAt', 'DESC').getMany();
  }

  async delete(id: string, userId: string) {
    const user = await this.recurringExpensesRepository.findOne({
      where: { user: { id: userId } },
    });

    if (user === null) {
      throw new RecurringExpenseNotFoundException(id);
    }
    await this.recurringExpensesRepository.delete(id);

    this.schedulerRegistry.deleteCronJob(id);
  }

  async update(
    id: string,
    userId: string,
    updateRecurringExpenseDto: UpdateRecurringExpenseDto,
  ): Promise<RecurringExpenseEntity> {
    const recurringExpense = await this.recurringExpensesRepository.findOne({
      where: { id: id, user: { id: userId } },
    });

    if (recurringExpense === null) {
      throw new RecurringExpenseNotFoundException(id);
    }

    if (updateRecurringExpenseDto.description !== undefined) {
      recurringExpense.description = updateRecurringExpenseDto.description;
    }
    if (updateRecurringExpenseDto.category !== undefined) {
      recurringExpense.category = updateRecurringExpenseDto.category;
    }
    if (updateRecurringExpenseDto.amount !== undefined) {
      recurringExpense.amount = updateRecurringExpenseDto.amount;
    }
    if (updateRecurringExpenseDto.endDate !== undefined) {
      recurringExpense.endDate = updateRecurringExpenseDto.endDate;
    }
    if (updateRecurringExpenseDto.startDate !== undefined) {
      recurringExpense.startDate = updateRecurringExpenseDto.startDate;
    }
    if (updateRecurringExpenseDto.recurringType !== undefined) {
      recurringExpense.recurringType = updateRecurringExpenseDto.recurringType;
      recurringExpense.cron = constructCron(
        recurringExpense.recurringType,
        recurringExpense.startDate,
      );
    }

    const updatedEntity =
      await this.recurringExpensesRepository.save(recurringExpense);

    if (
      updateRecurringExpenseDto.recurringType !== undefined ||
      updateRecurringExpenseDto.startDate !== undefined ||
      updateRecurringExpenseDto.endDate !== undefined
    ) {
      this.updateRecurringExpenseCronJob(updatedEntity);
    }

    return updatedEntity;
  }

  private updateRecurringExpenseCronJob(
    recurringExpense: RecurringExpenseEntity,
  ) {
    const job = this.schedulerRegistry.getCronJob(recurringExpense.id);

    const newCronTime = new CronTime(recurringExpense.cron);
    if (job.cronTime !== newCronTime) {
      job.setTime(newCronTime);
    }

    this.updateJobStatusById(
      recurringExpense.id,
      recurringExpense.startDate,
      recurringExpense.endDate,
    );
  }
}
