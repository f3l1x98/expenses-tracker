/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { RecurringIncomeEntity } from './entities/recurring-income.entitiy';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRecurringIncomeDto } from './dto/create-recurring-income.dto';
import { UserEntity } from '../users/entities/user.entity';

@Injectable()
export class RecurringIncomesService {
  constructor(
    @InjectRepository(RecurringIncomeEntity)
    private recurringIncomesRepository: Repository<RecurringIncomeEntity>,
  ) {}

  async create(
    userId: string,
    createRecurringIncomeDto: CreateRecurringIncomeDto,
  ): Promise<RecurringIncomeEntity> {
    const recurringIncome = new RecurringIncomeEntity();

    recurringIncome.amount = createRecurringIncomeDto.amount;
    recurringIncome.category = createRecurringIncomeDto.category;
    recurringIncome.notes = createRecurringIncomeDto.notes;
    recurringIncome.user = userId as unknown as UserEntity;
    recurringIncome.cron = createRecurringIncomeDto.cron;
    // TODO either class-validator or here: start before end!
    recurringIncome.startDate = createRecurringIncomeDto.startDate;
    recurringIncome.endDate = createRecurringIncomeDto.endDate;

    return this.recurringIncomesRepository.save(recurringIncome);
  }

  async findAllForUser(userId: string): Promise<RecurringIncomeEntity[]> {
    return this.recurringIncomesRepository.find({
      where: { user: { id: userId } },
    });
  }
}
