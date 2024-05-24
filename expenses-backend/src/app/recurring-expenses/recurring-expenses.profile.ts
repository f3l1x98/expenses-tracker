import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { RecurringExpenseEntity } from './entities/recurring-expense.entity';
import { RecurringExpenseDto } from './dto/recurring-expense.dto';
import { Mapper, MappingProfile, createMap } from '@automapper/core';

@Injectable()
export class RecurringExpensesProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper: Mapper) => {
      createMap(mapper, RecurringExpenseEntity, RecurringExpenseDto);
    };
  }
}
