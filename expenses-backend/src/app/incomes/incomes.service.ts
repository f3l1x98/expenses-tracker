/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { IncomeEntity } from './entities/income.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateIncomeDto } from './dto/create-income.dto';
import { UserEntity } from '../users/entities/user.entity';
import { IncomeNotFoundException } from './exceptions/income-not-found';
import { PriceEntity } from '../shared/prices/price.entity';

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

    income.price = new PriceEntity();
    income.price.amount = createIncomeDto.price.amount;
    income.price.currency = createIncomeDto.price.currency;
    income.category = createIncomeDto.category;
    income.notes = createIncomeDto.notes;
    income.user = userId as unknown as UserEntity;

    return this.incomesRepository.save(income);
  }

  async findAllForUser(userId: string): Promise<IncomeEntity[]> {
    return this.incomesRepository.find({
      where: { user: { id: userId } },
    });
  }

  async delete(id: string, userId: string) {
    const user = await this.incomesRepository.findOne({
      where: { user: { id: userId } },
    });

    if (user === null) {
      throw new IncomeNotFoundException(id);
    }
    await this.incomesRepository.delete(id);
  }
}
