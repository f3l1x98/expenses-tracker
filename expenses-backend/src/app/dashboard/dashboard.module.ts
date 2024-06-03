import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenseEntity } from '../expenses/entities/expense.entity';
import { IncomeEntity } from '../incomes/entities/income.entity';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExpenseEntity]),
    TypeOrmModule.forFeature([IncomeEntity]),
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
  exports: [],
})
export class DasboardsModule {}
