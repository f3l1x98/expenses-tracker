import { IncomeCategory } from '../income-category';

export interface CreateIncomeRequest {
  description: string;

  amount: number;

  category: IncomeCategory;
}
