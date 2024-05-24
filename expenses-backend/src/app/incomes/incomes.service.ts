/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { IncomeEntity } from './entities/income.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateIncomeDto } from './dto/create-income.dto';
import { UserEntity } from '../users/entities/user.entity';

@Injectable()
export class IncomesService {
  constructor(
    @InjectRepository(IncomeEntity)
    private incomesRepository: Repository<IncomeEntity>,
  ) {}

  async create(
    userId: string,
    createIncomeDto: CreateIncomeDto,
  ): Promise<IncomeEntity> {
    const income = new IncomeEntity();

    income.amount = createIncomeDto.amount;
    income.category = createIncomeDto.category;
    income.notes = createIncomeDto.notes;
    income.user = userId as unknown as UserEntity;

    return this.incomesRepository.save(income);
  }
}
