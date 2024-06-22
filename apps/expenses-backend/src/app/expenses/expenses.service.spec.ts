import { Repository } from 'typeorm';
import { ExpensesService } from './expenses.service';
import { ExpenseEntity } from './entities/expense.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { FilterDto } from './dto/filter.dto';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<object>;
};

export const repositoryMockFactory: () => MockType<
  Repository<Record<string, unknown>>
> = () => ({
  findOne: jest.fn((entity) => entity),
  find: jest.fn((entity) => entity),
  createQueryBuilder: jest.fn(() => createQueryBuilderDefaultMocks),
  // ...
});

const createQueryBuilderDefaultMocks = {
  select: jest.fn().mockReturnThis(),
  addSelect: jest.fn().mockReturnThis(),
  innerJoin: jest.fn().mockReturnThis(),
  where: jest.fn().mockReturnThis(),
  andWhere: jest.fn().mockReturnThis(),
  groupBy: jest.fn().mockReturnThis(),
  orderBy: jest.fn().mockReturnThis(),
  getMany: jest.fn((entity) => entity),
  getOne: jest.fn((entity) => entity),
  getRawMany: jest.fn((entity) => entity),
  getRawOne: jest.fn((entity) => entity),
};

// https://stackoverflow.com/questions/55366037/inject-typeorm-repository-into-nestjs-service-for-mock-data-testing
describe('ExpensesService', () => {
  let service: ExpensesService;
  let repositoryMock: MockType<Repository<ExpenseEntity>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExpensesService,
        // Provide your mock instead of the actual repository
        {
          provide: getRepositoryToken(ExpenseEntity),
          useFactory: repositoryMockFactory,
        },
        {
          provide: getRepositoryToken(UserEntity),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();
    service = module.get<ExpensesService>(ExpensesService);
    repositoryMock = module.get(getRepositoryToken(ExpenseEntity));
  });

  describe('findAllForUser', () => {
    describe('with filter', () => {
      describe('empty', () => {
        it('should find one expense', async () => {
          const user = new UserEntity();
          user.id = 'TestUserId';
          const expense = new ExpenseEntity();
          expense.id = 'TestId';
          expense.user = user;

          const filter: FilterDto = {};

          const whereSpy = jest.fn().mockReturnThis();
          repositoryMock.createQueryBuilder.mockImplementation(() => ({
            ...createQueryBuilderDefaultMocks,
            where: whereSpy,
            getMany: jest.fn().mockReturnValue([expense]),
          }));

          const result = await service.findAllForUser(user.id, filter);

          expect(result).toEqual([expense]);
          expect(whereSpy).toHaveBeenCalledWith('user.id = :userId', {
            userId: user.id,
          });
        });
      });

      describe('with description', () => {
        describe('empty', () => {
          it('should find one expense', async () => {
            const user = new UserEntity();
            user.id = 'TestUserId';
            const expense = new ExpenseEntity();
            expense.id = 'TestId';
            expense.user = user;

            const filter: FilterDto = {
              description: '',
            };

            const whereSpy = jest.fn().mockReturnThis();
            const andWhereSpy = jest.fn().mockReturnThis();
            repositoryMock.createQueryBuilder.mockImplementation(() => ({
              ...createQueryBuilderDefaultMocks,
              where: whereSpy,
              andWhere: andWhereSpy,
              getMany: jest.fn().mockReturnValue([expense]),
            }));

            const result = await service.findAllForUser(user.id, filter);

            expect(result).toEqual([expense]);
            expect(whereSpy).toHaveBeenCalledWith('user.id = :userId', {
              userId: user.id,
            });
            expect(andWhereSpy).toHaveBeenNthCalledWith(
              1,
              'expense.description ILIKE :description',
              {
                description: `%${filter.description ?? ''}%`,
              },
            );
          });
        });
      });

      describe('with category', () => {
        describe('missing', () => {
          it('should find one expense', async () => {
            const user = new UserEntity();
            user.id = 'TestUserId';
            const expense = new ExpenseEntity();
            expense.id = 'TestId';
            expense.user = user;

            const filter: FilterDto = {};

            const whereSpy = jest.fn().mockReturnThis();
            const andWhereSpy = jest.fn().mockReturnThis();
            repositoryMock.createQueryBuilder.mockImplementation(() => ({
              ...createQueryBuilderDefaultMocks,
              where: whereSpy,
              andWhere: andWhereSpy,
              getMany: jest.fn().mockReturnValue([expense]),
            }));

            const result = await service.findAllForUser(user.id, filter);

            expect(result).toEqual([expense]);
            expect(whereSpy).toHaveBeenCalledWith('user.id = :userId', {
              userId: user.id,
            });
            expect(andWhereSpy).toHaveBeenCalledTimes(1);
          });
        });
      });

      describe('with startDate and endDate', () => {
        it('should find one expense', async () => {
          const user = new UserEntity();
          user.id = 'TestUserId';
          const expense = new ExpenseEntity();
          expense.id = 'TestId';
          expense.user = user;

          const filter: FilterDto = {
            startDate: new Date(),
            endDate: new Date(),
          };

          const whereSpy = jest.fn().mockReturnThis();
          const andWhereSpy = jest.fn().mockReturnThis();
          repositoryMock.createQueryBuilder.mockImplementation(() => ({
            ...createQueryBuilderDefaultMocks,
            where: whereSpy,
            andWhere: andWhereSpy,
            getMany: jest.fn().mockReturnValue([expense]),
          }));

          const result = await service.findAllForUser(user.id, filter);

          expect(result).toEqual([expense]);
          expect(whereSpy).toHaveBeenCalledWith('user.id = :userId', {
            userId: user.id,
          });
          expect(andWhereSpy).toHaveBeenNthCalledWith(
            2,
            'expense.createdAt BETWEEN :startDate AND :endDate',
            { startDate: filter.startDate, endDate: filter.endDate },
          );
        });
      });

      describe('with startDate', () => {
        it('should find one expense', async () => {
          const user = new UserEntity();
          user.id = 'TestUserId';
          const expense = new ExpenseEntity();
          expense.id = 'TestId';
          expense.user = user;

          const filter: FilterDto = {
            startDate: new Date(),
          };

          const whereSpy = jest.fn().mockReturnThis();
          const andWhereSpy = jest.fn().mockReturnThis();
          repositoryMock.createQueryBuilder.mockImplementation(() => ({
            ...createQueryBuilderDefaultMocks,
            where: whereSpy,
            andWhere: andWhereSpy,
            getMany: jest.fn().mockReturnValue([expense]),
          }));

          const result = await service.findAllForUser(user.id, filter);

          expect(result).toEqual([expense]);
          expect(whereSpy).toHaveBeenCalledWith('user.id = :userId', {
            userId: user.id,
          });
          expect(andWhereSpy).toHaveBeenNthCalledWith(
            2,
            'expense.createdAt >= :startDate',
            {
              startDate: filter.startDate,
            },
          );
        });
      });

      describe('with endDate', () => {
        it('should find one expense', async () => {
          const user = new UserEntity();
          user.id = 'TestUserId';
          const expense = new ExpenseEntity();
          expense.id = 'TestId';
          expense.user = user;

          const filter: FilterDto = {
            endDate: new Date(),
          };

          const whereSpy = jest.fn().mockReturnThis();
          const andWhereSpy = jest.fn().mockReturnThis();
          repositoryMock.createQueryBuilder.mockImplementation(() => ({
            ...createQueryBuilderDefaultMocks,
            where: whereSpy,
            andWhere: andWhereSpy,
            getMany: jest.fn().mockReturnValue([expense]),
          }));

          const result = await service.findAllForUser(user.id, filter);

          expect(result).toEqual([expense]);
          expect(whereSpy).toHaveBeenCalledWith('user.id = :userId', {
            userId: user.id,
          });
          expect(andWhereSpy).toHaveBeenNthCalledWith(
            2,
            'expense.createdAt <= :endDate',
            {
              endDate: filter.endDate,
            },
          );
        });
      });
    });
  });
});
