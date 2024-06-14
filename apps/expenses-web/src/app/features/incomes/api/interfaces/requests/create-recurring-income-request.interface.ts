import { IncomeCategory } from '../income-category';

export interface CreateRecurringIncomeRequest {
  description: string;

  amount: number;

  category: IncomeCategory;

  cron: string;

  startDate: Date;

  endDate?: Date;
}
