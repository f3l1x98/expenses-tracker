/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { RecurringExpenseEntity } from './entities/recurring-expense.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRecurringExpenseDto } from './dto/create-recurring-expense.dto';
import { UserEntity } from '../users/entities/user.entity';

@Injectable()
export class RecurringExpensesService {
  constructor(
    @InjectRepository(RecurringExpenseEntity)
    private recurringExpensesRepository: Repository<RecurringExpenseEntity>,
  ) {}

  async create(
    userId: string,
    createRecurringExpenseDto: CreateRecurringExpenseDto,
  ): Promise<RecurringExpenseEntity> {
    const recurringExpense = new RecurringExpenseEntity();

    recurringExpense.amount = createRecurringExpenseDto.amount;
    recurringExpense.category = createRecurringExpenseDto.category;
    recurringExpense.notes = createRecurringExpenseDto.notes;
    recurringExpense.user = userId as unknown as UserEntity;
    recurringExpense.cron = createRecurringExpenseDto.cron;
    // TODO either class-validator or here: start before end!
    recurringExpense.startDate = createRecurringExpenseDto.startDate;
    recurringExpense.endDate = createRecurringExpenseDto.endDate;

    return this.recurringExpensesRepository.save(recurringExpense);
  }
}
