import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenseEntity } from '../expenses/entities/expense.entity';
import { IncomeEntity } from '../incomes/entities/income.entity';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { UserEntity } from '../users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExpenseEntity]),
    TypeOrmModule.forFeature([IncomeEntity]),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
  exports: [],
})
export class DasboardsModule {}
