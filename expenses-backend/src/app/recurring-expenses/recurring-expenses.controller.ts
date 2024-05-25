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
  Req,
  UseGuards,
} from '@nestjs/common';
import { RecurringExpensesService } from './recurring-expenses.service';
import { CreateRecurringExpenseDto } from './dto/create-recurring-expense.dto';
import { RecurringExpenseEntity } from './entities/recurring-expense.entity';
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
import { RecurringExpenseNotFoundException } from './exceptions/recurring-expense-not-found';

@ApiTags('recurring-expenses')
@ApiBearerAuth()
@ApiUnauthorizedResponse()
@UseGuards(JwtAuthGuard)
@Controller({
  path: 'recurring-expenses',
  version: '1',
})
export class RecurringExpensesController {
  constructor(private recurringExpensesService: RecurringExpensesService) {}

  @ApiOperation({ summary: 'Creates a new recurring expense.' })
  @ApiBody({
    type: CreateRecurringExpenseDto,
    required: true,
    description: 'Recurring expense information',
  })
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

  @ApiOperation({
    summary: 'Returns all recurring expenses for the requesting user.',
  })
  @Get()
  async findOwn(@Req() req: Request): Promise<RecurringExpenseEntity[]> {
    return this.recurringExpensesService.findAllForUser((req.user as IUser).id);
  }

  @ApiOperation({
    summary: 'Deletes the recurring expense with the specified id',
  })
  @ApiNotFoundResponse({
    description:
      'No recurring expense with the specified id was found for the requesting user',
  })
  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: Request) {
    try {
      await this.recurringExpensesService.delete(id, (req.user as IUser).id);
    } catch (e) {
      if (e instanceof RecurringExpenseNotFoundException) {
        throw new NotFoundException();
      }
      throw e;
    }
  }
}
