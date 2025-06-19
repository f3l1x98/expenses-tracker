import { Injectable } from '@nestjs/common';
import { IncomeEntity } from './entities/income.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateIncomeDto } from './dto/create-income.dto';
import { UserEntity } from '../users/entities/user.entity';
import { IncomeNotFoundException } from './exceptions/income-not-found';
import { UpdateIncomeDto } from './dto/update-income.dto';
import { IncomesFilterDto } from './dto/filter.dto';

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

    const savedEntity = await this.incomesRepository.save(income);
    return this.findByIdForUser(savedEntity.id, userId);
  }

  // TODO unsure if return undefined or throw IncomeNotFoundException
  async findByIdForUser(
    incomeId: string,
    userId: string,
  ): Promise<IncomeEntity | null> {
    const query = this.incomesRepository
      .createQueryBuilder('income')
      .innerJoinAndSelect('income.user', 'user')
      .where('income.id = :incomeId', { incomeId })
      .andWhere('user.id = :userId', { userId });
    return query.getOne();
  }

  async findAllForUser(
    userId: string,
    filter: IncomesFilterDto,
  ): Promise<IncomeEntity[]> {
    let query = this.incomesRepository
      .createQueryBuilder('income')
      .innerJoinAndSelect('income.user', 'user')
      .where('user.id = :userId', { userId })
      .andWhere('income.description ILIKE :description', {
        description: `%${filter.description ?? ''}%`,
      });

    if (filter.category !== undefined) {
      query = query.andWhere('income.category = :category', {
        category: filter.category,
      });
    }

    if (filter.startDate !== undefined && filter.endDate !== undefined) {
      query = query.andWhere(
        'income.createdAt BETWEEN :startDate AND :endDate',
        { startDate: filter.startDate, endDate: filter.endDate },
      );
    } else if (filter.startDate !== undefined) {
      query = query.andWhere('income.createdAt >= :startDate', {
        startDate: filter.startDate,
      });
    } else if (filter.endDate !== undefined) {
      query = query.andWhere('income.createdAt <= :endDate', {
        endDate: filter.endDate,
      });
    }

    return query.orderBy('income.createdAt', 'DESC').getMany();
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
