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
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('expenses')
@ApiBearerAuth()
@ApiUnauthorizedResponse()
@UseGuards(JwtAuthGuard)
@Controller({
  path: 'expenses',
  version: '1',
})
export class ExpensesController {
  constructor(private expensesService: ExpensesService) {}

  @ApiOperation({ summary: 'Creates a new expense.' })
  @ApiBody({
    type: CreateExpenseDto,
    required: true,
    description: 'Expense information',
  })
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

  @ApiOperation({
    summary: 'Returns all expenses for the requesting user.',
  })
  @Get()
  async findOwn(@Req() req: Request): Promise<ExpenseEntity[]> {
    return this.expensesService.findAllForUser((req.user as IUser).id);
  }
}
