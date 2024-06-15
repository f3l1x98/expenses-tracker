import { ApiProperty } from '@nestjs/swagger';
import { CurrentMonthDataDto } from 'expenses-shared';

export class CurrentMonthData implements CurrentMonthDataDto {
  @ApiProperty({
    description: 'Total expense of the current month',
    required: true,
  })
  totalExpense: number;

  @ApiProperty({
    description: 'Total income of the current month',
    required: true,
  })
  totalIncome: number;

  @ApiProperty({
    description: 'Balance of the current month',
    required: true,
  })
  balance: number;

  @ApiProperty({
    description: 'Currency of the provided data',
    required: true,
  })
  currency: string;
}
