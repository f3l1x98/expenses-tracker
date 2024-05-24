/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { ExpenseEntity } from './entities/expense.entity';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { Request } from 'express';
import { IUser } from '../users/entities/user';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller({
  path: 'expenses',
  version: '1',
})
export class ExpensesController {
  constructor(private expensesService: ExpensesService) {}

  @Post()
  async create(
    @Body() createExpenseDto: CreateExpenseDto,
    @Req() req: Request,
  ): Promise<ExpenseEntity> {
    return this.expensesService.create(
      (req.user as IUser).id,
      createExpenseDto,
    );
  }

  @Get()
  async findOwn(@Req() req: Request): Promise<ExpenseEntity[]> {
    return this.expensesService.findAllForUser((req.user as IUser).id);
  }
}
