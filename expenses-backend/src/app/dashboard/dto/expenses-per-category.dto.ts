import { ApiProperty } from '@nestjs/swagger';

export class ExpensesPerCategory {
  @ApiProperty({
    description: 'List of total expenses for each month request',
    required: true,
  })
  data: TotalExpenseOfCategory[];

  @ApiProperty({
    description: 'Currency of the provided data',
    required: true,
  })
  currency: string;
}

export class TotalExpenseOfCategory {
  @ApiProperty({
    description: 'Category of provided data',
    required: true,
  })
  category: string;

  @ApiProperty({
    description: 'Total expense amount of category',
    required: true,
  })
  amount: number;

  @ApiProperty({
    description: 'Chart color for the provided data',
    required: true,
  })
  color: string;

  constructor(category: string, amount: number, color: string) {
    this.category = category;
    this.amount = amount;
    this.color = color;
  }
}
