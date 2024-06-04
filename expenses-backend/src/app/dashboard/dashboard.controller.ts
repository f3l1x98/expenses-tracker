import { UseGuards, Controller, Query, Get, Req } from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
  ApiOperation,
  ApiQuery,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DashboardService } from './dashboard.service';
import { CurrentMonthData } from './dto/current-month-data.dto';
import { ExpensesPerCategory } from './dto/expenses-per-category.dto';
import { ExpensesPerMonth } from './dto/expenses-per-month.dto';
import { DateRangeDto } from '../shared/date-range.dto';
import { Request } from 'express';
import { IUser } from '../users/entities/user';

@ApiTags('dashboards')
@ApiBearerAuth()
@ApiUnauthorizedResponse()
@UseGuards(JwtAuthGuard)
@Controller({
  path: 'dashboards',
  version: '1',
})
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  @ApiOperation({ summary: 'Returns dashboard data for the current month.' })
  @Get('current-month')
  getCurrentMonthData(@Req() req: Request): Promise<CurrentMonthData> {
    return this.dashboardService.getCurrentMonthData((req.user as IUser).id);
  }

  @ApiOperation({
    summary:
      'Returns dashboard data for expenses for each category of the requested date range.',
  })
  @ApiQuery({
    name: 'startDate',
    required: true,
    type: String,
    description: 'The start date of the range (ISO 8601 format)',
  })
  @ApiQuery({
    name: 'endDate',
    required: true,
    type: String,
    description: 'The end date of the range (ISO 8601 format)',
  })
  @Get('expenses-per-category')
  getExpensesPerCategory(
    @Req() req: Request,
    @Query() query: DateRangeDto,
  ): Promise<ExpensesPerCategory> {
    return this.dashboardService.getExpensesPerCategory(
      (req.user as IUser).id,
      query,
    );
  }

  @ApiOperation({
    summary:
      'Returns dashboard data for expenses for each month of the requested date range.',
  })
  @ApiQuery({
    name: 'startDate',
    required: true,
    type: String,
    description: 'The start date of the range (ISO 8601 format)',
  })
  @ApiQuery({
    name: 'endDate',
    required: true,
    type: String,
    description: 'The end date of the range (ISO 8601 format)',
  })
  @Get('expenses-per-month')
  getExpensesPerMonth(
    @Req() req: Request,
    @Query() query: DateRangeDto,
  ): Promise<ExpensesPerMonth> {
    return this.dashboardService.getExpensesPerMonth(
      (req.user as IUser).id,
      query,
    );
  }
}
