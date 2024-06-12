import { INestApplication } from '@nestjs/common';
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
import { IUser } from 'src/app/users/entities/user';
import { defaultSettings } from 'src/app/users/entities/user-settings';
import { UserEntity } from 'src/app/users/entities/user.entity';

describe('Expenses', () => {
  let app: INestApplication;
  let expensesServiceMock: ExpensesService;

  const JWT_SECRET = 'secret';

  const user: IUser = {
    id: '784f94c2-1909-423c-9cec-41eed35ef013',
    username: 'TestUser',
    settings: defaultSettings,
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
    describe('with valid dto', () => {
      it('should return 201 Created', () => {
        const dto = {
          category: ExpenseCategory.MISC,
          amount: 20.14,
          description: 'Test',
        } as CreateExpenseDto;

        return request(app.getHttpServer())
          .post('/v1/expenses')
          .send(dto)
          .expect(201);
      });
    });

    describe('with price', () => {
      describe('being empty', () => {
        it('should return 400 Bad Request', () => {
          const dto = {
            category: ExpenseCategory.MISC,
          } as CreateExpenseDto;

          return request(app.getHttpServer())
            .post('/v1/expenses')
            .send(dto)
            .expect(400);
        });
      });

      describe('amount negative number', () => {
        describe('negative', () => {
          it('should return 400 Bad Request', () => {
            const dto = {
              category: ExpenseCategory.MISC,
              amount: -1,
            } as CreateExpenseDto;

            return request(app.getHttpServer())
              .post('/v1/expenses')
              .send(dto)
              .expect(400);
          });
        });
        describe('zero', () => {
          it('should return 400 Bad Request', () => {
            const dto = {
              category: ExpenseCategory.MISC,
              amount: 0,
            } as CreateExpenseDto;

            return request(app.getHttpServer())
              .post('/v1/expenses')
              .send(dto)
              .expect(400);
          });
        });
      });
    });
  });

  describe('/expenses (GET)', () => {
    let findAllForUserSpy: jest.SpyInstance<
      Promise<ExpenseEntity[]>,
      [userId: string]
    >;

    beforeEach(() => {
      findAllForUserSpy = jest
        .spyOn(expensesServiceMock, 'findAllForUser')
        .mockResolvedValue([
          {
            id: 'ab1f810c-676f-2aa3-8e23-3dba8d0f393e',
            category: ExpenseCategory.MISC,
            description: 'Test',
            amount: 20.0,
            user: user as UserEntity,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ]);
    });

    it('200 Ok', async () => {
      const response = await request(app.getHttpServer())
        .get('/v1/expenses')
        .send()
        .expect(200);

      expect(response.body).toEqual([
        expect.objectContaining({
          category: 'misc',
          id: 'ab1f810c-676f-2aa3-8e23-3dba8d0f393e',
          description: 'Test',
          amount: 20,
          user: {
            id: '784f94c2-1909-423c-9cec-41eed35ef013',
            username: 'TestUser',
            settings: defaultSettings,
          },
        }),
      ]);
      expect(findAllForUserSpy).toHaveBeenCalledTimes(1);
    });
  });
});
