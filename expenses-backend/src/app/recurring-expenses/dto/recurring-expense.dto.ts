import { ApiProperty } from '@nestjs/swagger';
import { ExpenseCategory } from 'src/app/expenses/entities/expense-category';
import { UserDto } from 'src/app/users/dto/user.dto';

export class RecurringExpenseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  amount!: number;

  @ApiProperty()
  category!: ExpenseCategory;

  @ApiProperty()
  user!: UserDto;

  @ApiProperty()
  notes?: string;

  @ApiProperty()
  cron!: string;

  @ApiProperty()
  startDate?: Date;

  @ApiProperty()
  endDate?: Date;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}
