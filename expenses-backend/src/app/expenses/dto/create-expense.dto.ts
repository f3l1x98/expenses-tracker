import { IsNumber, IsPositive } from 'class-validator';
import { ExpenseCategory } from '../entities/expense-category';

export abstract class CreateExpenseDto {
  // TODO has IsCurrency which expects string
  @IsNumber({ maxDecimalPlaces: 2, allowInfinity: false, allowNaN: false })
  @IsPositive()
  amount: number;
  category: ExpenseCategory;
  notes?: string;
}
