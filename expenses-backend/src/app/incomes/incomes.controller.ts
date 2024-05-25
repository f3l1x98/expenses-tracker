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
import { IncomesService } from './incomes.service';
import { CreateIncomeDto } from './dto/create-income.dto';
import { IncomeEntity } from './entities/income.entity';
import { IUser } from '../users/entities/user';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { IncomeNotFoundException } from './exceptions/income-not-found';

@ApiTags('incomes')
@ApiBearerAuth()
@ApiUnauthorizedResponse()
@UseGuards(JwtAuthGuard)
@Controller({
  path: 'incomes',
  version: '1',
})
export class IncomesController {
  constructor(private incomesService: IncomesService) {}

  @ApiOperation({ summary: 'Creates a new income.' })
  @ApiBody({
    type: CreateIncomeDto,
    required: true,
    description: 'Income information',
  })
  @Post()
  async create(
    @Body() createIncomeDto: CreateIncomeDto,
    @Req() req: Request,
  ): Promise<IncomeEntity> {
    return this.incomesService.create((req.user as IUser).id, createIncomeDto);
  }

  @ApiOperation({
    summary: 'Returns all incomes for the requesting user.',
  })
  @Get()
  async findOwn(@Req() req: Request): Promise<IncomeEntity[]> {
    return this.incomesService.findAllForUser((req.user as IUser).id);
  }

  @ApiOperation({
    summary: 'Deletes the income with the specified id',
  })
  @ApiNotFoundResponse({
    description:
      'No income with the specified id was found for the requesting user',
  })
  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: Request) {
    try {
      await this.incomesService.delete(id, (req.user as IUser).id);
    } catch (e) {
      if (e instanceof IncomeNotFoundException) {
        throw new NotFoundException();
      }
      throw e;
    }
  }
}
