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
import { RecurringIncomesService } from './recurring-incomes.service';
import { CreateRecurringIncomeDto } from './dto/create-recurring-income.dto';
import { RecurringIncomeEntity } from './entities/recurring-income.entitiy';
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
import { RecurringIncomeNotFoundException } from './exceptions/recurring-income-not-found';

@ApiTags('recurring-incomes')
@ApiBearerAuth()
@ApiUnauthorizedResponse()
@UseGuards(JwtAuthGuard)
@Controller({
  path: 'recurring-incomes',
  version: '1',
})
export class RecurringIncomesController {
  constructor(private recurringIncomesService: RecurringIncomesService) {}

  @ApiOperation({ summary: 'Creates a new recurring income.' })
  @ApiBody({
    type: CreateRecurringIncomeDto,
    required: true,
    description: 'Recurring income information',
  })
  @Post()
  async create(
    @Body() createRecurringIncomeDto: CreateRecurringIncomeDto,
    @Req() req: Request,
  ): Promise<RecurringIncomeEntity> {
    return this.recurringIncomesService.create(
      (req.user as IUser).id,
      createRecurringIncomeDto,
    );
  }

  @ApiOperation({
    summary: 'Returns all recurring incomes for the requesting user.',
  })
  @Get()
  async findOwn(@Req() req: Request): Promise<RecurringIncomeEntity[]> {
    return this.recurringIncomesService.findAllForUser((req.user as IUser).id);
  }

  @ApiOperation({
    summary: 'Deletes the recurring income with the specified id',
  })
  @ApiNotFoundResponse({
    description:
      'No recurring income with the specified id was found for the requesting user',
  })
  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: Request) {
    try {
      await this.recurringIncomesService.delete(id, (req.user as IUser).id);
    } catch (e) {
      if (e instanceof RecurringIncomeNotFoundException) {
        throw new NotFoundException();
      }
      throw e;
    }
  }
}
