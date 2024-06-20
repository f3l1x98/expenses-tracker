import { PartialType } from '@nestjs/mapped-types';
import { CreateIncomeDto } from './create-income.dto';
import { IUpdateIncomeDto } from 'expenses-shared';

export class UpdateIncomeDto
  extends PartialType(CreateIncomeDto)
  implements IUpdateIncomeDto {}
