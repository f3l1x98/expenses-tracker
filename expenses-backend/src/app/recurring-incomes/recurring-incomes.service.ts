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
import { CronJob } from 'cron';
import { IncomesService } from '../incomes/incomes.service';
import { CreateIncomeDto } from '../incomes/dto/create-income.dto';

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
      this.startRecurringIncomeCronJob(recurringIncome);
    }
  }

  private startRecurringIncomeCronJob(recurringIncome: RecurringIncomeEntity) {
    const job = new CronJob(recurringIncome.cron, async () => {
      const incomeDto = new CreateIncomeDto();
      incomeDto.category = recurringIncome.category;
      incomeDto.notes = recurringIncome.notes;
      incomeDto.price = recurringIncome.price;

      await this.incomesService.create(recurringIncome.user.id, incomeDto);
    });

    this.schedulerRegistry.addCronJob(recurringIncome.id, job);

    if (
      recurringIncome.startDate !== undefined &&
      recurringIncome.startDate.getTime() <= Date.now()
    ) {
      job.start();
    }
  }

  @Cron('0 2 * * *')
  async checkRecurringIncomeJobs() {
    const recurringIncomes = await this.recurringIncomesRepository.find();
    const currentDate = Date.now();
    for (const recurringIncome of recurringIncomes) {
      if (
        recurringIncome.startDate !== undefined &&
        recurringIncome.startDate.getTime() <= currentDate
      ) {
        const job = this.schedulerRegistry.getCronJob(recurringIncome.id);
        if (!job.running) {
          job.start();
        }
      } else if (
        recurringIncome.endDate !== undefined &&
        recurringIncome.endDate.getTime() >= currentDate
      ) {
        this.schedulerRegistry.deleteCronJob(recurringIncome.id);
      }
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

    this.startRecurringIncomeCronJob(recurringIncomeEntity);

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
}
