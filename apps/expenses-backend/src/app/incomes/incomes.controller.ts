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
import { IncomesService } from './incomes.service';
import { CreateIncomeDto } from './dto/create-income.dto';
import { IncomeEntity } from './entities/income.entity';
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
import { UpdateIncomeDto } from './dto/update-income.dto';
import { IUser } from 'expenses-shared';

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

  @ApiOperation({
    summary: 'Updates the income with the specified id using the provided body',
  })
  @ApiBody({
    type: UpdateIncomeDto,
    required: true,
    description: 'Income information',
  })
  @ApiNotFoundResponse({
    description:
      'No income with the specified id was found for the requesting user',
  })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Req() req: Request,
    @Body() updateIncomeDto: UpdateIncomeDto,
  ) {
    try {
      await this.incomesService.update(
        id,
        (req.user as IUser).id,
        updateIncomeDto,
      );
    } catch (e) {
      if (e instanceof IncomeNotFoundException) {
        throw new NotFoundException();
      }
      throw e;
    }
  }
}
