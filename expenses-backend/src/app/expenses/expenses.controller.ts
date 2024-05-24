/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
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
import { ExpenseDto } from './dto/expense.dto';
import { InjectMapper, MapInterceptor } from '@automapper/nestjs';
import { ExpenseEntity } from './entities/expense.entity';
import { Mapper } from '@automapper/core';

@ApiTags('expenses')
@ApiBearerAuth()
@ApiUnauthorizedResponse()
@UseGuards(JwtAuthGuard)
@Controller({
  path: 'expenses',
  version: '1',
})
export class ExpensesController {
  constructor(
    private expensesService: ExpensesService,
    @InjectMapper() private mapper: Mapper,
  ) {}

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
  ): Promise<ExpenseDto> {
    return this.expensesService.create(
      (req.user as IUser).id,
      createExpenseDto,
    );
  }

  @ApiOperation({
    summary: 'Returns all expenses for the requesting user.',
  })
  @Get()
  // TODO this decorator does not work (either wrong config or broken)
  @UseInterceptors(MapInterceptor(ExpenseEntity, ExpenseDto))
  async findOwn(@Req() req: Request): Promise<ExpenseDto[]> {
    const t = await this.expensesService.findAllForUser((req.user as IUser).id);
    console.dir(t, { depth: null });
    //return this.mapper.mapArray(t, ExpenseEntity, ExpenseDto);
    return t;
  }
}
