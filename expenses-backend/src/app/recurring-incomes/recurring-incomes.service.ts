/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { RecurringIncomeEntity } from './entities/recurring-income.entitiy';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRecurringIncomeDto } from './dto/create-recurring-income.dto';
import { UserEntity } from '../users/entities/user.entity';
import { RecurringIncomeNotFoundException } from './exceptions/recurring-income-not-found';
import { PriceEntity } from '../shared/prices/price.entity';

@Injectable()
export class RecurringIncomesService {
  constructor(
    @InjectRepository(RecurringIncomeEntity)
    private recurringIncomesRepository: Repository<RecurringIncomeEntity>,
  ) {}

  async create(
    userId: string,
    createRecurringIncomeDto: CreateRecurringIncomeDto,
  ): Promise<RecurringIncomeEntity> {
    const recurringIncome = new RecurringIncomeEntity();

    recurringIncome.price = new PriceEntity();
    recurringIncome.price.amount = createRecurringIncomeDto.price.amount;
    recurringIncome.price.currency = createRecurringIncomeDto.price.currency;
    recurringIncome.category = createRecurringIncomeDto.category;
    recurringIncome.notes = createRecurringIncomeDto.notes;
    recurringIncome.user = userId as unknown as UserEntity;
    recurringIncome.cron = createRecurringIncomeDto.cron;
    recurringIncome.startDate = createRecurringIncomeDto.startDate;
    recurringIncome.endDate = createRecurringIncomeDto.endDate;

    return this.recurringIncomesRepository.save(recurringIncome);
  }

  async findAllForUser(userId: string): Promise<RecurringIncomeEntity[]> {
    return this.recurringIncomesRepository.find({
      where: { user: { id: userId } },
    });
  }

  async delete(id: string, userId: string) {
    const user = await this.recurringIncomesRepository.findOne({
      where: { user: { id: userId } },
    });

    if (user === null) {
      throw new RecurringIncomeNotFoundException(id);
    }
    await this.recurringIncomesRepository.delete(id);
  }
}
