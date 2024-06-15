/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { ExpenseEntity } from './entities/expense.entity';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { Request } from 'express';
import { IUser } from '../users/entities/user';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ExpenseNotFoundException } from './exceptions/expense-not-found';
import { UpdateExpenseDto } from './dto/update-expense.dto';

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

  @ApiOperation({
    summary: 'Deletes the expense with the specified id',
  })
  @ApiNotFoundResponse({
    description:
      'No expense with the specified id was found for the requesting user',
  })
  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: Request) {
    try {
      await this.expensesService.delete(id, (req.user as IUser).id);
    } catch (e) {
      if (e instanceof ExpenseNotFoundException) {
        throw new NotFoundException();
      }
      throw e;
    }
  }

  @ApiOperation({
    summary:
      'Updates the expense with the specified id using the provided body',
  })
  @ApiBody({
    type: UpdateExpenseDto,
    required: true,
    description: 'Expense information',
  })
  @ApiNotFoundResponse({
    description:
      'No expense with the specified id was found for the requesting user',
  })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Req() req: Request,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ) {
    try {
      await this.expensesService.update(
        id,
        (req.user as IUser).id,
        updateExpenseDto,
      );
    } catch (e) {
      if (e instanceof ExpenseNotFoundException) {
        throw new NotFoundException();
      }
      throw e;
    }
  }
}
