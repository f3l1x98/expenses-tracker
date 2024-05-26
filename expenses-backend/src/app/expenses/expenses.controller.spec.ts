import { Test } from '@nestjs/testing';
import { ExpensesController } from './expenses.controller';
import { ExpensesService } from './expenses.service';
import { ExpenseEntity } from './entities/expense.entity';
import { Request } from 'express';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';

describe('ExpensesController', () => {
  let expensesController: ExpensesController;
  let expensesService: ExpensesService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([ExpenseEntity])],
      controllers: [ExpensesController],
      providers: [ExpensesService],
    })
      .overrideProvider(getRepositoryToken(ExpenseEntity))
      .useValue({})

      .compile();

    expensesService = moduleRef.get<ExpensesService>(ExpensesService);
    expensesController = moduleRef.get<ExpensesController>(ExpensesController);
  });

  describe('findOwn', () => {
    it('should return an array of expenses', async () => {
      const expense = new ExpenseEntity();
      const result = [expense];
      jest.spyOn(expensesService, 'findAllForUser').mockResolvedValue(result);

      expect(
        await expensesController.findOwn({
          user: { id: 'TestId' },
        } as unknown as Request),
      ).toBe(result);
    });
  });
});
