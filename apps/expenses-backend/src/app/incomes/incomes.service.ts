import { Injectable } from '@nestjs/common';
import { IncomeEntity } from './entities/income.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateIncomeDto } from './dto/create-income.dto';
import { UserEntity } from '../users/entities/user.entity';
import { IncomeNotFoundException } from './exceptions/income-not-found';
import { UpdateIncomeDto } from './dto/update-income.dto';

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

    income.description = createIncomeDto.description;
    income.amount = createIncomeDto.amount;
    income.category = createIncomeDto.category;
    income.user = userId as unknown as UserEntity;
    income.recurringIncome = createIncomeDto.recurringIncome;

    return this.incomesRepository.save(income);
  }

  async findAllForUser(userId: string): Promise<IncomeEntity[]> {
    return this.incomesRepository.find({
      where: { user: { id: userId } },
      order: {
        createdAt: 'DESC',
      },
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

  async update(
    id: string,
    userId: string,
    updateIncomeDto: UpdateIncomeDto,
  ): Promise<IncomeEntity> {
    const income = await this.incomesRepository.findOne({
      where: { id: id, user: { id: userId } },
    });

    if (income === null) {
      throw new IncomeNotFoundException(id);
    }

    if (updateIncomeDto.description !== undefined) {
      income.description = updateIncomeDto.description;
    }
    if (updateIncomeDto.category !== undefined) {
      income.category = updateIncomeDto.category;
    }
    if (updateIncomeDto.amount !== undefined) {
      income.amount = updateIncomeDto.amount;
    }

    return this.incomesRepository.save(income);
  }
}
