import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ExpenseEntity } from './entities/expense.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UserEntity } from '../users/entities/user.entity';
import { ExpenseNotFoundException } from './exceptions/expense-not-found';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { FilterDto } from './dto/filter.dto';

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

  async findAllForUser(
    userId: string,
    filter: FilterDto,
  ): Promise<ExpenseEntity[]> {
    let query = this.expensesRepository
      .createQueryBuilder('expense')
      .innerJoin('expense.user', 'user')
      .where('user.id = :userId', { userId })
      .andWhere('expense.description ILIKE :description', {
        description: `%${filter.description ?? ''}%`,
      });

    if (filter.category !== undefined) {
      query = query.andWhere('expense.category = :category', {
        category: filter.category,
      });
    }

    if (filter.startDate !== undefined && filter.endDate !== undefined) {
      query = query.andWhere(
        'expense.createdAt BETWEEN :startDate AND :endDate',
        { startDate: filter.startDate, endDate: filter.endDate },
      );
    } else if (filter.startDate !== undefined) {
      query = query.andWhere('expense.createdAt >= :startDate', {
        startDate: filter.startDate,
      });
    } else if (filter.endDate !== undefined) {
      query = query.andWhere('expense.createdAt <= :endDate', {
        endDate: filter.endDate,
      });
    }

    return query.orderBy('expense.createdAt', 'DESC').getMany();
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
