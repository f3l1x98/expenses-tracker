import { PartialType } from '@nestjs/swagger';
import { CreateRecurringExpenseDto } from './create-recurring-expense.dto';
import { IUpdateRecurringExpenseDto } from 'expenses-shared';

export class UpdateRecurringExpenseDto
  extends PartialType(CreateRecurringExpenseDto)
  implements IUpdateRecurringExpenseDto {}
