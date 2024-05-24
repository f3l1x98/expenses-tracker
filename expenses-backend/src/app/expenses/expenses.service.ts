/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ExpenseEntity } from './entities/expense.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UserEntity } from '../users/entities/user.entity';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(ExpenseEntity)
    private expensesRepository: Repository<ExpenseEntity>,
  ) {}

  async create(
    userId: string,
    createExpenseDto: CreateExpenseDto,
  ): Promise<ExpenseEntity> {
    const expense = new ExpenseEntity();

    expense.amount = createExpenseDto.amount;
    expense.category = createExpenseDto.category;
    expense.notes = createExpenseDto.notes;
    expense.user = userId as unknown as UserEntity;

    return this.expensesRepository.save(expense);
  }

  async findAllForUser(userId: string): Promise<ExpenseEntity[]> {
    return this.expensesRepository.find({
      where: { user: { id: userId } },
    });
  }
}
