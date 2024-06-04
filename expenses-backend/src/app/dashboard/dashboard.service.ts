import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExpenseEntity } from '../expenses/entities/expense.entity';
import { DateRangeDto } from '../shared/date-range.dto';
import { CurrentMonthData } from './dto/current-month-data.dto';
import {
  ExpensesPerCategory,
  TotalExpenseOfCategory,
} from './dto/expenses-per-category.dto';
import {
  ExpensesPerMonth,
  TotalExpenseOfMonth,
} from './dto/expenses-per-month.dto';
import { IncomeEntity } from '../incomes/entities/income.entity';
import {
  ExpenseCategory,
  getExpenseCategoryColor,
} from '../expenses/entities/expense-category';
import { UserEntity } from '../users/entities/user.entity';

interface ExpensesPerCategoryQueryResponse {
  category: ExpenseCategory;
  totalAmount: number;
}

interface ExpensesPerMonthQueryResponse {
  monthYear: string;
  totalAmount: number;
}

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(ExpenseEntity)
    private expensesRepository: Repository<ExpenseEntity>,
    @InjectRepository(IncomeEntity)
    private incomesRepository: Repository<IncomeEntity>,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async getCurrentMonthData(userId: string): Promise<CurrentMonthData> {
    const userResult = await this.usersRepository.findOne({
      where: { id: userId },
    });

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const expensesResult = await this.expensesRepository
      .createQueryBuilder('expense')
      .addSelect('SUM(expense.amount)', 'totalAmount')
      .innerJoin('expense.user', 'user')
      .where('user.id = :userId', { userId })
      .andWhere('expense.createdAt >= :startOfMonth', { startOfMonth })
      .getRawOne<number>();
    const incomesResult = await this.incomesRepository
      .createQueryBuilder('income')
      .addSelect('SUM(income.amount)', 'totalAmount')
      .innerJoin('income.user', 'user')
      .where('user.id = :userId', { userId })
      .andWhere('income.createdAt >= :startOfMonth', { startOfMonth })
      .getRawOne<number>();

    const currentMonthData = new CurrentMonthData();
    currentMonthData.currency = userResult?.settings.currency ?? '';
    currentMonthData.totalExpense = expensesResult ?? 0;
    currentMonthData.totalIncome = incomesResult ?? 0;
    currentMonthData.balance =
      currentMonthData.totalIncome - currentMonthData.totalExpense;
    return currentMonthData;
  }

  async getExpensesPerCategory(
    userId: string,
    dateRange: DateRangeDto,
  ): Promise<ExpensesPerCategory> {
    const result = await this.expensesRepository
      .createQueryBuilder('expense')
      .select('expense.category', 'category')
      .addSelect('SUM(expense.amount)', 'totalAmount')
      .innerJoin('expense.user', 'user')
      .where('user.id = :userId', { userId })
      .andWhere('expense.createdAt BETWEEN :startDate AND :endDate', dateRange)
      .groupBy('expense.category')
      .getRawMany<ExpensesPerCategoryQueryResponse>();

    const userResult = await this.usersRepository.findOne({
      where: { id: userId },
    });

    const expensesPerCategory = new ExpensesPerCategory();
    expensesPerCategory.currency = userResult?.settings.currency ?? '';
    expensesPerCategory.data = result.map(
      (item) =>
        new TotalExpenseOfCategory(
          item.category,
          item.totalAmount,
          getExpenseCategoryColor(item.category),
        ),
    );
    return expensesPerCategory;
  }

  async getExpensesPerMonth(
    userId: string,
    dateRange: DateRangeDto,
  ): Promise<ExpensesPerMonth> {
    const result = await this.expensesRepository
      .createQueryBuilder('expense')
      .select("TO_CHAR(expense.createdAt, 'YYYY-MM')", 'monthYear')
      .addSelect('SUM(expense.amount)', 'totalAmount')
      .innerJoin('expense.user', 'user')
      .where('user.id = :userId', { userId })
      .andWhere('expense.createdAt BETWEEN :startDate AND :endDate', dateRange)
      .groupBy('"monthYear"')
      .orderBy('"monthYear"')
      .getRawMany<ExpensesPerMonthQueryResponse>();

    const userResult = await this.usersRepository.findOne({
      where: { id: userId },
    });

    const expensesPerMonth = new ExpensesPerMonth();
    expensesPerMonth.currency = userResult?.settings.currency ?? '';
    expensesPerMonth.data = result.map(
      (item) => new TotalExpenseOfMonth(item.monthYear, item.totalAmount),
    );
    return expensesPerMonth;
  }
}
