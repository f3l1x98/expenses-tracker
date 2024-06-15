import { IncomeCategory } from 'expenses-shared';

export interface CreateRecurringIncomeRequest {
  description: string;

  amount: number;

  category: IncomeCategory;

  cron: string;

  startDate: Date;

  endDate?: Date;
}
