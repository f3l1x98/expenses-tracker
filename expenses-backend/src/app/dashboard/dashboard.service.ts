import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExpenseEntity } from '../expenses/entities/expense.entity';
import { DateRangeDto } from '../shared/date-range.dto';
import { CurrentMonthData } from './dto/current-month-data.dto';
import { ExpensesPerCategory } from './dto/expenses-per-category.dto';
import { ExpensesPerMonth } from './dto/expenses-per-month.dto';
import { IncomeEntity } from '../incomes/entities/income.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(ExpenseEntity)
    private expensesRepository: Repository<ExpenseEntity>,
    @InjectRepository(IncomeEntity)
    private incomesRepository: Repository<IncomeEntity>,
  ) {}

  getCurrentMonthData(userId: string): CurrentMonthData {
    const currentMonthData = new CurrentMonthData();
    // TODO retrieve data from repositories
    return currentMonthData;
  }

  getExpensesPerCategory(
    userId: string,
    dateRange: DateRangeDto,
  ): ExpensesPerCategory {
    const expensesPerCategory = new ExpensesPerCategory();
    // TODO retrieve data from repositories
    return expensesPerCategory;
  }

  getExpensesPerMonth(
    userId: string,
    dateRange: DateRangeDto,
  ): ExpensesPerMonth {
    const expensesPerMonth = new ExpensesPerMonth();
    // TODO retrieve data from repositories
    return expensesPerMonth;
  }
}
