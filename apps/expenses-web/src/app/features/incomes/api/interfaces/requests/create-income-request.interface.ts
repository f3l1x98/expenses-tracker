import { IncomeCategory } from 'expenses-shared';

export interface CreateIncomeRequest {
  description: string;

  amount: number;

  category: IncomeCategory;
}
