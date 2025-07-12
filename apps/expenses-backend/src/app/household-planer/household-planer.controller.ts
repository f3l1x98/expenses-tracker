import { UseGuards, Controller, Get, Req } from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  IHouseholdExpensePerCategoryResponse,
  IHouseholdExpenseResponse,
  IHouseholdIncomePerCategoryResponse,
  IHouseholdIncomeResponse,
  IUser,
} from 'expenses-shared';
import { HouseholdPlanerService } from './household-planer.service';
import { UsersService } from '../users/users.service';

@ApiTags('household-planer')
@ApiBearerAuth()
@ApiUnauthorizedResponse()
@UseGuards(JwtAuthGuard)
@Controller({
  path: 'householdPlaner',
  version: '1',
})
export class HouseholdPlanerController {
  constructor(
    private householdPlanerService: HouseholdPlanerService,
    private usersService: UsersService,
  ) {}

  @ApiOperation({
    summary: 'Returns expenses for household planer.',
  })
  @Get('expenses')
  async findHouseholdPlanerExpenses(
    @Req() req: Request,
  ): Promise<IHouseholdExpenseResponse> {
    const userId = (req.user as IUser).id;
    const householdExpenses =
      await this.householdPlanerService.findHouseholdPlanerExpensesForUser(
        userId,
      );
    const user = await this.usersService.findById(userId);
    return {
      data: householdExpenses,
      currency: user.settings.currency,
    };
  }

  @ApiOperation({
    summary: 'Returns incomes for household planer.',
  })
  @Get('incomes')
  async findHouseholdPlanerIncomes(
    @Req() req: Request,
  ): Promise<IHouseholdIncomeResponse> {
    const userId = (req.user as IUser).id;
    const householdIncomes =
      await this.householdPlanerService.findHouseholdPlanerIncomesForUser(
        userId,
      );
    const user = await this.usersService.findById(userId);
    return {
      data: householdIncomes,
      currency: user.settings.currency,
    };
  }

  @ApiOperation({
    summary: 'Returns expenses per category overview for household planer.',
  })
  @Get('expenses/overview')
  async findHouseholdPlanerExpensesPerCategory(
    @Req() req: Request,
  ): Promise<IHouseholdExpensePerCategoryResponse> {
    const userId = (req.user as IUser).id;
    const expensesPerCategory =
      await this.householdPlanerService.getHouseholdExpensesPerCategoryForUser(
        userId,
      );
    const user = await this.usersService.findById(userId);
    return {
      data: expensesPerCategory,
      currency: user.settings.currency,
    };
  }

  @ApiOperation({
    summary: 'Returns incomes per category overview for household planer.',
  })
  @Get('incomes/overview')
  async findHouseholdPlanerIncomesPerCategory(
    @Req() req: Request,
  ): Promise<IHouseholdIncomePerCategoryResponse> {
    const userId = (req.user as IUser).id;
    const incomesPerCategory =
      await this.householdPlanerService.getHouseholdIncomesPerCategoryForUser(
        userId,
      );
    const user = await this.usersService.findById(userId);
    return {
      data: incomesPerCategory,
      currency: user.settings.currency,
    };
  }
}
