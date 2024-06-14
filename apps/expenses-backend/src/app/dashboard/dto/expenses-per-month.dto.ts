import { ApiProperty } from '@nestjs/swagger';

export class ExpensesPerMonth {
  @ApiProperty({
    description: 'List of total expenses for each month request',
    required: true,
  })
  data: TotalExpenseOfMonth[];

  @ApiProperty({
    description: 'Currency of the provided data',
    required: true,
  })
  currency: string;
}

export class TotalExpenseOfMonth {
  @ApiProperty({
    description: 'Month of provided data',
    required: true,
  })
  month: string;

  @ApiProperty({
    description: 'Total expense amount of month',
    required: true,
  })
  amount: number;

  constructor(month: string, amount: number) {
    this.month = month;
    this.amount = amount;
  }
}
