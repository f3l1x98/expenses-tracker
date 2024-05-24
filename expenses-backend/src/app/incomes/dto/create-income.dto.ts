import { IsNumber, IsPositive } from 'class-validator';
import { IncomeCategory } from '../entities/income-category';

export abstract class CreateIncomeDto {
  // TODO has IsCurrency which expects string
  @IsNumber({ maxDecimalPlaces: 2, allowInfinity: false, allowNaN: false })
  @IsPositive()
  amount: number;
  category: IncomeCategory;
  notes?: string;
}
