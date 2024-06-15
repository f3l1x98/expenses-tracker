/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ExpenseEntity } from './entities/expense.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UserEntity } from '../users/entities/user.entity';
import { ExpenseNotFoundException } from './exceptions/expense-not-found';
import { UpdateExpenseDto } from './dto/update-expense.dto';

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

    expense.description = createExpenseDto.description;
    expense.amount = createExpenseDto.amount;
    expense.category = createExpenseDto.category;
    expense.user = userId as unknown as UserEntity;
    expense.recurringExpense = createExpenseDto.recurringExpense;

    return this.expensesRepository.save(expense);
  }

  async findAllForUser(userId: string): Promise<ExpenseEntity[]> {
    return this.expensesRepository.find({
      where: { user: { id: userId } },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async delete(id: string, userId: string) {
    const user = await this.expensesRepository.findOne({
      where: { user: { id: userId } },
    });

    if (user === null) {
      throw new ExpenseNotFoundException(id);
    }
    await this.expensesRepository.delete(id);
  }

  async update(
    id: string,
    userId: string,
    updateExpenseDto: UpdateExpenseDto,
  ): Promise<ExpenseEntity> {
    const expense = await this.expensesRepository.findOne({
      where: { id: id, user: { id: userId } },
    });

    if (expense === null) {
      throw new ExpenseNotFoundException(id);
    }

    if (updateExpenseDto.description !== undefined) {
      expense.description = updateExpenseDto.description;
    }
    if (updateExpenseDto.category !== undefined) {
      expense.category = updateExpenseDto.category;
    }
    if (updateExpenseDto.amount !== undefined) {
      expense.amount = updateExpenseDto.amount;
    }

    return this.expensesRepository.save(expense);
  }
}
