import { Mapper, MappingProfile, createMap } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { ExpenseEntity } from './entities/expense.entity';
import { ExpenseDto } from './dto/expense.dto';

@Injectable()
export class ExpensesProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper: Mapper) => {
      createMap(mapper, ExpenseEntity, ExpenseDto);
    };
  }
}
