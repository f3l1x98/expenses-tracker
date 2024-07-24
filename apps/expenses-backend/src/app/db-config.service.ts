import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ExpenseEntity } from './expenses/entities/expense.entity';
import { IncomeEntity } from './incomes/entities/income.entity';
import { UserEntity } from './users/entities/user.entity';
import { RecurringExpenseEntity } from './recurring-expenses/entities/recurring-expense.entity';
import { RecurringIncomeEntity } from './recurring-incomes/entities/recurring-income.entitiy';
import { Init1718282660623 } from './migrations/1718282660623-Init';
import { IncomeCategoryExtension1719404768848 } from './migrations/1719404768848-IncomeCategoryExtension';
import { RecurringType1719778452504 } from './migrations/1719778452504-RecurringType';

@Injectable()
export class DbConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    return {
      type: 'postgres',
      host: this.configService.get<string>('DATABASE_HOST') as string,
      port: this.configService.get<number>('DATABASE_PORT') as number,
      username: this.configService.get<string>('DATABASE_USERNAME') as string,
      password: this.configService.get<string>('DATABASE_PASSWORD') as string,
      database: this.configService.get<string>('DATABASE_DATABASE') as string,
      entities: [
        ExpenseEntity,
        IncomeEntity,
        UserEntity,
        RecurringExpenseEntity,
        RecurringIncomeEntity,
      ],
      migrationsRun: true,
      migrations: [
        Init1718282660623,
        IncomeCategoryExtension1719404768848,
        RecurringType1719778452504,
      ],
    };
  }
}
