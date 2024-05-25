/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { RecurringExpenseEntity } from './entities/recurring-expense.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRecurringExpenseDto } from './dto/create-recurring-expense.dto';
import { UserEntity } from '../users/entities/user.entity';
import { RecurringExpenseNotFoundException } from './exceptions/recurring-expense-not-found';
import { PriceEntity } from '../shared/prices/price.entity';
import { SchedulerRegistry, Cron } from '@nestjs/schedule';
import { CronJob, CronTime } from 'cron';
import { ExpensesService } from '../expenses/expenses.service';
import { CreateExpenseDto } from '../expenses/dto/create-expense.dto';
import { UpdateRecurringExpenseDto } from './dto/update-recurring-expense.dto';

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
      expenseDto.category = recurringExpenseEntity.category;
      expenseDto.notes = recurringExpenseEntity.notes;
      expenseDto.price = recurringExpenseEntity.price;

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

    recurringExpense.price = new PriceEntity();
    recurringExpense.price.amount = createRecurringExpenseDto.price.amount;
    recurringExpense.price.currency = createRecurringExpenseDto.price.currency;
    recurringExpense.category = createRecurringExpenseDto.category;
    recurringExpense.notes = createRecurringExpenseDto.notes;
    recurringExpense.user = userId as unknown as UserEntity;
    recurringExpense.cron = createRecurringExpenseDto.cron;
    recurringExpense.startDate = createRecurringExpenseDto.startDate;
    recurringExpense.endDate = createRecurringExpenseDto.endDate;

    const recurringExpenseEntity =
      await this.recurringExpensesRepository.save(recurringExpense);

    this.createRecurringExpenseCronJob(recurringExpenseEntity);

    return recurringExpenseEntity;
  }

  async findAllForUser(userId: string): Promise<RecurringExpenseEntity[]> {
    return this.recurringExpensesRepository.find({
      where: { user: { id: userId } },
    });
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

    if (updateRecurringExpenseDto.category !== undefined) {
      recurringExpense.category = updateRecurringExpenseDto.category;
    }
    if (updateRecurringExpenseDto.notes !== undefined) {
      recurringExpense.notes = updateRecurringExpenseDto.notes;
    }
    if (updateRecurringExpenseDto.price !== undefined) {
      recurringExpense.price = updateRecurringExpenseDto.price;
    }
    if (updateRecurringExpenseDto.cron !== undefined) {
      recurringExpense.cron = updateRecurringExpenseDto.cron;
    }
    if (updateRecurringExpenseDto.endDate !== undefined) {
      recurringExpense.endDate = updateRecurringExpenseDto.endDate;
    }
    if (updateRecurringExpenseDto.startDate !== undefined) {
      recurringExpense.startDate = updateRecurringExpenseDto.startDate;
    }

    const updatedEntity =
      await this.recurringExpensesRepository.save(recurringExpense);

    if (
      updateRecurringExpenseDto.cron !== undefined ||
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
