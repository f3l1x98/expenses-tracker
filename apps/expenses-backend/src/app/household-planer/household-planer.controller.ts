import { UseGuards, Controller, Get, Req } from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { IHouseholdExpense, IHouseholdIncome, IUser } from 'expenses-shared';
import { HouseholdPlanerService } from './household-planer.service';

@ApiTags('household-planer')
@ApiBearerAuth()
@ApiUnauthorizedResponse()
@UseGuards(JwtAuthGuard)
@Controller({
  path: 'householdPlaner',
  version: '1',
})
export class HouseholdPlanerController {
  constructor(private householdPlanerService: HouseholdPlanerService) {}

  @ApiOperation({
    summary: 'Returns expenses for household planer.',
  })
  @Get('expenses')
  async findHouseholdPlanerExpenses(
    @Req() req: Request,
  ): Promise<IHouseholdExpense[]> {
    return this.householdPlanerService.findHouseholdPlanerExpensesForUser(
      (req.user as IUser).id,
    );
  }

  @ApiOperation({
    summary: 'Returns incomes for household planer.',
  })
  @Get('incomes')
  async findHouseholdPlanerIncomes(
    @Req() req: Request,
  ): Promise<IHouseholdIncome[]> {
    return this.householdPlanerService.findHouseholdPlanerIncomesForUser(
      (req.user as IUser).id,
    );
  }
}
