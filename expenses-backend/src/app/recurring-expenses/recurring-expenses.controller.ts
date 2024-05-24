/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { RecurringExpensesService } from './recurring-expenses.service';
import { CreateRecurringExpenseDto } from './dto/create-recurring-expense.dto';
import { RecurringExpenseEntity } from './entities/recurring-expense.entity';
import { Request } from 'express';
import { IUser } from '../users/entities/user';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('recurring-expenses')
export class RecurringExpensesController {
  constructor(private recurringExpensesService: RecurringExpensesService) {}

  @Post()
  async create(
    @Body() createRecurringExpenseDto: CreateRecurringExpenseDto,
    @Req() req: Request,
  ): Promise<RecurringExpenseEntity> {
    return this.recurringExpensesService.create(
      (req.user as IUser).id,
      createRecurringExpenseDto,
    );
  }
}
