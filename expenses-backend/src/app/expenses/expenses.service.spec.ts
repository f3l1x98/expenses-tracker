import { Repository } from 'typeorm';
import { ExpensesService } from './expenses.service';
import { ExpenseEntity } from './entities/expense.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../users/entities/user.entity';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<object>;
};

export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => ({
    findOne: jest.fn((entity) => entity),
    find: jest.fn((entity) => entity),
    // ...
  }),
);

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
      ],
    }).compile();
    service = module.get<ExpensesService>(ExpensesService);
    repositoryMock = module.get(getRepositoryToken(ExpenseEntity));
  });

  describe('findAllForUser', () => {
    it('should find one expense', async () => {
      const user = new UserEntity();
      user.id = 'TestUserId';
      const expense = new ExpenseEntity();
      expense.id = 'TestId';
      expense.user = user;

      repositoryMock.find!.mockReturnValue([expense]);

      const result = await service.findAllForUser(user.id);

      expect(result).toEqual([expense]);
      expect(repositoryMock.find).toHaveBeenCalledWith({
        where: { user: { id: user.id } },
      });
    });
  });
});
