import { ExecutionContext, INestApplication } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { setupApp } from 'src/app/app';
import { ExpenseEntity } from 'src/app/expenses/entities/expense.entity';
import { ExpensesModule } from 'src/app/expenses/expenses.module';
import { ExpensesService } from 'src/app/expenses/expenses.service';
import { resetAllWhenMocks } from 'jest-when';
import { createTestingModuleWithDefaultMocks } from './mock';
import * as request from 'supertest';
import { CreateExpenseDto } from 'src/app/expenses/dto/create-expense.dto';
import { ExpenseCategory } from 'src/app/expenses/entities/expense-category';
import { UserEntity } from 'src/app/users/entities/user.entity';
import { IUser } from 'src/app/users/entities/user';

describe('Expenses', () => {
  let app: INestApplication;
  let expensesServiceMock: ExpensesService;

  const JWT_SECRET = 'secret';

  const user: IUser = {
    id: '784f94c2-1909-423c-9cec-41eed35ef013',
    username: 'TestUser',
  };

  beforeAll(async () => {
    const moduleRef = await createTestingModuleWithDefaultMocks(
      {
        imports: [ExpensesModule],
      },
      {
        JWT_SECRET,
      },
      user,
    )
      .overrideProvider(ExpensesService)
      .useValue({
        create: jest.fn(),
        findAllForUser: jest.fn(),
        delete: jest.fn(),
        update: jest.fn(),
      })

      .overrideProvider(getRepositoryToken(ExpenseEntity))
      .useValue({})

      .overrideProvider(getRepositoryToken(UserEntity))
      .useValue({})

      .compile();

    expensesServiceMock = moduleRef.get(ExpensesService);

    app = moduleRef.createNestApplication();
    setupApp(app);

    await app.init();
  });

  afterEach(() => {
    jest.resetAllMocks();
    resetAllWhenMocks();
  });

  describe('/expenses (POST)', () => {
    describe('with price', () => {
      describe('being empty', () => {
        it('should return 400 Bad Request', () => {
          const dto = new CreateExpenseDto();
          dto.category = ExpenseCategory.MISC;
          return request(app.getHttpServer())
            .post('/v1/expenses')
            .set({ authorization: 'TODO' })
            .send(dto)
            .expect(400);
        });
      });
    });
  });
});
