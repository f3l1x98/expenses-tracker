import { IncomeCategory } from '../income-category';

export interface ICreateIncomeDto {
  description: string;
  amount: number;
  category: IncomeCategory;
}
