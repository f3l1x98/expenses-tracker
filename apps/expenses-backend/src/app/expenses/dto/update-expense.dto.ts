import { PartialType } from '@nestjs/mapped-types';
import { CreateExpenseDto } from './create-expense.dto';
import { IUpdateExpenseDto } from 'expenses-shared';

export class UpdateExpenseDto
  extends PartialType(CreateExpenseDto)
  implements IUpdateExpenseDto {}
