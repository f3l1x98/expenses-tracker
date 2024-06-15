import { TypeOrmModule } from '@nestjs/typeorm';
import { RecurringExpenseEntity } from './entities/recurring-expense.entity';
import { RecurringExpensesController } from './recurring-expenses.controller';
import { RecurringExpensesService } from './recurring-expenses.service';
import { Module } from '@nestjs/common';
import { ExpensesModule } from '../expenses/expenses.module';

@Module({
  imports: [ExpensesModule, TypeOrmModule.forFeature([RecurringExpenseEntity])],
  controllers: [RecurringExpensesController],
  providers: [RecurringExpensesService],
})
export class RecurringExpensesModule {}
