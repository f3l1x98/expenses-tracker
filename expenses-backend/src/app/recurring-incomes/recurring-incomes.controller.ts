/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { RecurringIncomesService } from './recurring-incomes.service';
import { CreateRecurringIncomeDto } from './dto/create-recurring-income.dto';
import { RecurringIncomeEntity } from './entities/recurring-income.entitiy';
import { Request } from 'express';
import { IUser } from '../users/entities/user';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('recurring-incomes')
export class RecurringIncomesController {
  constructor(private recurringIncomesService: RecurringIncomesService) {}

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
}
