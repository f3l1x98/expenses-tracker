import { UserDto } from 'src/app/users/dto/user.dto';
import { ExpenseCategory } from '../entities/expense-category';
import { RecurringExpenseDto } from 'src/app/recurring-expenses/dto/recurring-expense.dto';
import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';

export class ExpenseDto {
  @ApiProperty()
  @AutoMap()
  id!: string;

  @ApiProperty()
  @AutoMap()
  category!: ExpenseCategory;

  @ApiProperty()
  @AutoMap(() => UserDto)
  user!: UserDto;

  @ApiProperty()
  @AutoMap()
  notes?: string;

  @ApiProperty()
  @AutoMap()
  createdAt!: Date;

  @ApiProperty()
  @AutoMap()
  updatedAt!: Date;

  @ApiProperty()
  @AutoMap(() => RecurringExpenseDto)
  recurringExpense?: RecurringExpenseDto;
}
