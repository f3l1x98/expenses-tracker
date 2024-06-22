import { INestApplication } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { setupApp } from '../src/app/app';
import { ExpenseEntity } from '../src/app/expenses/entities/expense.entity';
import { ExpensesModule } from '../src/app/expenses/expenses.module';
import { ExpensesService } from '../src/app/expenses/expenses.service';
import { resetAllWhenMocks } from 'jest-when';
import { createTestingModuleWithDefaultMocks } from './mock';
// Import this way due to "esModuleInterop": true
import request from 'supertest';
import { CreateExpenseDto } from '../src/app/expenses/dto/create-expense.dto';
import { UserEntity } from '../src/app/users/entities/user.entity';
import { ExpenseCategory, IUser, defaultSettings } from 'expenses-shared';
import { FilterDto } from '../src/app/expenses/dto/filter.dto';

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

    describe('with description', () => {
      describe('being missing', () => {
        it('should return 400 Bad Request', async () => {
          const dto = {
            category: ExpenseCategory.MISC,
            amount: 20.14,
          } as CreateExpenseDto;

          const response = await request(app.getHttpServer())
            .post('/v1/expenses')
            .send(dto)
            .expect(400);

          expect(response.body).toEqual(
            expect.objectContaining({
              message: [
                'description should not be empty',
                'description must be a string',
              ],
            }),
          );
        });
      });
      describe('being empty', () => {
        it('should return 400 Bad Request', async () => {
          const dto = {
            category: ExpenseCategory.MISC,
            amount: 20.14,
            description: '',
          } as CreateExpenseDto;

          const response = await request(app.getHttpServer())
            .post('/v1/expenses')
            .send(dto)
            .expect(400);

          expect(response.body).toEqual(
            expect.objectContaining({
              message: ['description should not be empty'],
            }),
          );
        });
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
      [userId: string, filter: FilterDto]
    >;

    beforeEach(() => {
      // TODO this should probably now be different, depending on if findAllForUser was called with correct filter?!?!?
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

    describe('with filter', () => {
      describe('empty', () => {
        it('200 Ok', async () => {
          const filter = {};
          const response = await request(app.getHttpServer())
            .get('/v1/expenses')
            .query(filter)
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
          expect(findAllForUserSpy).toHaveBeenCalledWith(
            '784f94c2-1909-423c-9cec-41eed35ef013',
            filter,
          );
        });
      });

      describe('with description', () => {
        describe('empty', () => {
          it('200 Ok', async () => {
            const filter = { description: '' };
            const response = await request(app.getHttpServer())
              .get('/v1/expenses')
              .query(filter)
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
            expect(findAllForUserSpy).toHaveBeenCalledWith(
              '784f94c2-1909-423c-9cec-41eed35ef013',
              filter,
            );
          });
        });
        describe('normal string', () => {
          it('200 Ok', async () => {
            const filter = { description: 'Test' };
            const response = await request(app.getHttpServer())
              .get('/v1/expenses')
              .query(filter)
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
            expect(findAllForUserSpy).toHaveBeenCalledWith(
              '784f94c2-1909-423c-9cec-41eed35ef013',
              filter,
            );
          });
        });
      });

      describe('with category', () => {
        describe('valid', () => {
          it('200 Ok', async () => {
            const filter = { category: 'misc' };
            const response = await request(app.getHttpServer())
              .get('/v1/expenses')
              .query(filter)
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
            expect(findAllForUserSpy).toHaveBeenCalledWith(
              '784f94c2-1909-423c-9cec-41eed35ef013',
              filter,
            );
          });
        });
        describe('invalid', () => {
          it('400 Bad Request', async () => {
            const filter = { category: 'test' };
            const response = await request(app.getHttpServer())
              .get('/v1/expenses')
              .query(filter)
              .send()
              .expect(400);

            expect(response.body).toEqual({
              error: 'Bad Request',
              message: [
                'category must be one of the following values: car, invoice, clothing, entertainment, grocery, healthcare, vacation, misc',
              ],
              statusCode: 400,
            });
            expect(findAllForUserSpy).toHaveBeenCalledTimes(0);
          });
        });
      });

      describe('with startDate and endDate', () => {
        describe('valid', () => {
          it('200 Ok', async () => {
            const filter = {
              startDate: new Date(1),
              endDate: new Date(100000),
            };
            const response = await request(app.getHttpServer())
              .get('/v1/expenses')
              .query(filter)
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
            expect(findAllForUserSpy).toHaveBeenCalledWith(
              '784f94c2-1909-423c-9cec-41eed35ef013',
              filter,
            );
          });
        });
        describe('endDate before startDate', () => {
          it('400 Bad Request', async () => {
            const filter = {
              startDate: new Date(100000),
              endDate: new Date(1),
            };
            const response = await request(app.getHttpServer())
              .get('/v1/expenses')
              .query(filter)
              .send()
              .expect(400);

            expect(response.body).toEqual({
              error: 'Bad Request',
              message: ['endDate must be after startDate'],
              statusCode: 400,
            });
            expect(findAllForUserSpy).toHaveBeenCalledTimes(0);
          });
        });
      });

      describe('with startDate', () => {
        describe('valid', () => {
          it('200 Ok', async () => {
            const filter = { startDate: new Date() };
            const response = await request(app.getHttpServer())
              .get('/v1/expenses')
              .query(filter)
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
            expect(findAllForUserSpy).toHaveBeenCalledWith(
              '784f94c2-1909-423c-9cec-41eed35ef013',
              filter,
            );
          });
        });
        describe('invalid', () => {
          it('400 Bad Request', async () => {
            const filter = { startDate: 'bliblablub' };
            const response = await request(app.getHttpServer())
              .get('/v1/expenses')
              .query(filter)
              .send()
              .expect(400);

            expect(response.body).toEqual({
              error: 'Bad Request',
              message: ['startDate must be a Date instance'],
              statusCode: 400,
            });
            expect(findAllForUserSpy).toHaveBeenCalledTimes(0);
          });
        });
      });
    });
  });
});
