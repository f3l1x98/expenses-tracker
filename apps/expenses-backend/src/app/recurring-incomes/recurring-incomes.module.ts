import { TypeOrmModule } from '@nestjs/typeorm';
import { RecurringIncomesController } from './recurring-incomes.controller';
import { RecurringIncomesService } from './recurring-incomes.service';
import { Module } from '@nestjs/common';
import { RecurringIncomeEntity } from './entities/recurring-income.entitiy';
import { IncomesModule } from '../incomes/incomes.module';

@Module({
  imports: [IncomesModule, TypeOrmModule.forFeature([RecurringIncomeEntity])],
  controllers: [RecurringIncomesController],
  providers: [RecurringIncomesService],
})
export class RecurringIncomesModule {}
