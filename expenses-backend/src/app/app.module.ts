import { HealthModule } from './health/health.module';
import { RecurringIncomesModule } from './recurring-incomes/recurring-incomes.module';
import { RecurringExpensesModule } from './recurring-expenses/recurring-expenses.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { IncomesModule } from './incomes/incomes.module';
import { ExpensesModule } from './expenses/expenses.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DbConfigService } from './db-config.service';
import { ScheduleModule } from '@nestjs/schedule';
import { DasboardsModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    HealthModule,
    RecurringIncomesModule,
    RecurringExpensesModule,
    AuthModule,
    UsersModule,
    IncomesModule,
    ExpensesModule,
    DasboardsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DbConfigService,
    }),
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
