import { INestApplication } from '@nestjs/common';
import { createTestingModuleWithDefaultMocks } from './mock';
import { UsersModule } from '../src/app/users/users.module';
import { UsersService } from '../src/app/users/users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../src/app/users/entities/user.entity';
import { setupApp } from '../src/app/app';
import { resetAllWhenMocks } from 'jest-when';
import { defaultSettings } from '../src/app/users/entities/user-settings';
import { CreateUserDto } from '../src/app/users/dto/create-user.dto';
// Import this way due to "esModuleInterop": true
import request from 'supertest';

describe('Users', () => {
  let app: INestApplication;
  let usersServiceMock: UsersService;

  const JWT_SECRET = 'secret';

  beforeAll(async () => {
    const moduleRef = await createTestingModuleWithDefaultMocks(
      {
        imports: [UsersModule],
      },
      {
        JWT_SECRET,
      },
    )
      .overrideProvider(UsersService)
      .useValue({
        create: jest.fn(),
        findByUsername: jest.fn(),
        findById: jest.fn(),
        updateSettings: jest.fn(),
      })

      .overrideProvider(getRepositoryToken(UserEntity))
      .useValue({})

      .compile();

    usersServiceMock = moduleRef.get(UsersService);

    app = moduleRef.createNestApplication();
    setupApp(app);

    await app.init();
  });

  afterEach(() => {
    jest.resetAllMocks();
    resetAllWhenMocks();
  });

  describe('/users (POST)', () => {
    let createSpy: jest.SpyInstance<
      Promise<UserEntity>,
      [createUserDto: CreateUserDto]
    >;

    beforeEach(() => {
      createSpy = jest.spyOn(usersServiceMock, 'create').mockResolvedValue({
        id: 'ab1f810c-676f-2aa3-8e23-3dba8d0f393e',
        username: '',
        settings: defaultSettings,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });

    describe('with valid dto', () => {
      it('should return 201 Created', async () => {
        const dto = {
          password: 'Test',
          username: 'Test',
          settings: defaultSettings,
        } as CreateUserDto;

        await request(app.getHttpServer())
          .post('/v1/users')
          .send(dto)
          .expect(201);

        expect(createSpy).toHaveBeenCalledTimes(1);
        expect(createSpy).toHaveBeenCalledWith({
          password: 'Test',
          username: 'Test',
          settings: defaultSettings,
        });
      });
    });

    describe('with settings', () => {
      describe('being missing', () => {
        it('should return 201 Created with default settings', async () => {
          const dto = {
            password: 'Test',
            username: 'Test',
          } as CreateUserDto;

          await request(app.getHttpServer())
            .post('/v1/users')
            .send(dto)
            .expect(201);

          expect(createSpy).toHaveBeenCalledTimes(1);
          expect(createSpy).toHaveBeenCalledWith({
            password: 'Test',
            username: 'Test',
            settings: defaultSettings,
          });
        });
      });
      describe('containing invalid currency code', () => {
        it('should return 400 Bad Request', async () => {
          const dto = {
            password: 'Test',
            username: 'Test',
            settings: {
              currency: 'EU',
            },
          } as CreateUserDto;

          await request(app.getHttpServer())
            .post('/v1/users')
            .send(dto)
            .expect(400);

          expect(createSpy).toHaveBeenCalledTimes(0);
        });
      });
      describe('missing currency code', () => {
        it('should return 400 Bad Request', async () => {
          const dto = {
            password: 'Test',
            username: 'Test',
            settings: {},
          } as CreateUserDto;

          await request(app.getHttpServer())
            .post('/v1/users')
            .send(dto)
            .expect(400);

          expect(createSpy).toHaveBeenCalledTimes(0);
        });
      });
    });
  });
});
