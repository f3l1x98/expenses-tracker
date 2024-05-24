/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { IncomesService } from './incomes.service';
import { CreateIncomeDto } from './dto/create-income.dto';
import { IncomeEntity } from './entities/income.entity';
import { IUser } from '../users/entities/user';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller({
  path: 'incomes',
  version: '1',
})
export class IncomesController {
  constructor(private incomesService: IncomesService) {}

  @Post()
  async create(
    @Body() createIncomeDto: CreateIncomeDto,
    @Req() req: Request,
  ): Promise<IncomeEntity> {
    return this.incomesService.create((req.user as IUser).id, createIncomeDto);
  }

  @Get()
  async findOwn(@Req() req: Request): Promise<IncomeEntity[]> {
    return this.incomesService.findAllForUser((req.user as IUser).id);
  }
}
