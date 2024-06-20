import { PartialType } from '@nestjs/swagger';
import { CreateRecurringIncomeDto } from './create-recurring-income.dto';
import { IUpdateRecurringIncomeDto } from 'expenses-shared';

export class UpdateRecurringIncomeDto
  extends PartialType(CreateRecurringIncomeDto)
  implements IUpdateRecurringIncomeDto {}
