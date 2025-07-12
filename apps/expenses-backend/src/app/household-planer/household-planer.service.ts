import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import {
  IHouseholdExpense,
  IHouseholdIncome,
  IHouseholdExpensePerCategory,
  IHouseholdIncomePerCategory,
} from 'expenses-shared';
import { DataSource } from 'typeorm';

@Injectable()
export class HouseholdPlanerService {
  constructor(@InjectDataSource() private readonly datasource: DataSource) {}

  async findHouseholdPlanerExpensesForUser(
    userId: string,
  ): Promise<IHouseholdExpense[]> {
    const sql = `
    SELECT description,
    	amount,
    	category,
    	"recurringType",
    	"monthlyAmount",
    	"quarterlyAmount",
    	"yearlyAmount"
    FROM (
    	SELECT description,
    		amount,
    		category,
    		"recurringType",
    		SUM("monthlyAmount") AS "monthlyAmount",
    		SUM("quarterlyAmount") AS "quarterlyAmount",
    		SUM("yearlyAmount") AS "yearlyAmount"
    	FROM (
    		SELECT description,
    			amount,
    			category,
    			"recurringType",
    			CASE
    				WHEN "recurringType" = 'monthly' THEN amount
    				WHEN "recurringType" = 'quarterly' THEN ROUND(amount / 3, 2)
    				WHEN "recurringType" = 'yearly' THEN ROUND(amount / 12, 2)
    				ELSE NULL
    			END AS "monthlyAmount",
    			CASE
    				WHEN "recurringType" = 'monthly' THEN ROUND(amount * 3, 2)
    				WHEN "recurringType" = 'quarterly' THEN amount
    				WHEN "recurringType" = 'yearly' THEN ROUND(amount / 4, 2)
    				ELSE NULL
    			END AS "quarterlyAmount",
    			CASE
    				WHEN "recurringType" = 'monthly' THEN ROUND(amount * 12, 2)
    				WHEN "recurringType" = 'quarterly' THEN ROUND(amount * 4, 2)
    				WHEN "recurringType" = 'yearly' THEN amount
    				ELSE NULL
    			END AS "yearlyAmount"
    		FROM public.recurring_expense_entity
    		WHERE "userId" = '${userId}'
    		AND "recurringType" NOT IN ('weekly', 'custom')
    	) filtered
    	GROUP BY GROUPING SETS (
    		(category, description, amount, "recurringType"),
        (category),
    		()
    	)
    ) grouped
    ORDER BY category, amount, description
    ;
    `;
    return this.datasource.query<IHouseholdExpense[]>(sql);
  }

  async findHouseholdPlanerIncomesForUser(
    userId: string,
  ): Promise<IHouseholdIncome[]> {
    const sql = `
    SELECT description,
    	amount,
    	category,
    	"recurringType",
    	"monthlyAmount",
    	"quarterlyAmount",
    	"yearlyAmount"
    FROM (
    	SELECT description,
    		amount,
    		category,
    		"recurringType",
    		SUM("monthlyAmount") AS "monthlyAmount",
    		SUM("quarterlyAmount") AS "quarterlyAmount",
    		SUM("yearlyAmount") AS "yearlyAmount"
    	FROM (
    		SELECT description,
    			amount,
    			category,
    			"recurringType",
    			CASE
    				WHEN "recurringType" = 'monthly' THEN amount
    				WHEN "recurringType" = 'quarterly' THEN ROUND(amount / 3, 2)
    				WHEN "recurringType" = 'yearly' THEN ROUND(amount / 12, 2)
    				ELSE NULL
    			END AS "monthlyAmount",
    			CASE
    				WHEN "recurringType" = 'monthly' THEN ROUND(amount * 3, 2)
    				WHEN "recurringType" = 'quarterly' THEN amount
    				WHEN "recurringType" = 'yearly' THEN ROUND(amount / 4, 2)
    				ELSE NULL
    			END AS "quarterlyAmount",
    			CASE
    				WHEN "recurringType" = 'monthly' THEN ROUND(amount * 12, 2)
    				WHEN "recurringType" = 'quarterly' THEN ROUND(amount * 4, 2)
    				WHEN "recurringType" = 'yearly' THEN amount
    				ELSE NULL
    			END AS "yearlyAmount"
    		FROM public.recurring_income_entity
    		WHERE "userId" = '${userId}'
    		AND "recurringType" NOT IN ('weekly', 'custom')
    	) filtered
    	GROUP BY GROUPING SETS (
    		(category, description, amount, "recurringType"),
        (category),
    		()
    	)
    ) grouped
    ORDER BY category, amount, description
    ;
    `;
    return this.datasource.query<IHouseholdIncome[]>(sql);
  }

  async getHouseholdExpensesPerCategoryForUser(
    userId: string,
  ): Promise<IHouseholdExpensePerCategory[]> {
    const sql = `
      SELECT category,
    		SUM("monthlyAmount") AS "monthlyAmount",
    		SUM("quarterlyAmount") AS "quarterlyAmount",
    		SUM("yearlyAmount") AS "yearlyAmount"
    	FROM (
    		SELECT description,
    			category,
    			"recurringType",
    			CASE
    				WHEN "recurringType" = 'monthly' THEN amount
    				WHEN "recurringType" = 'quarterly' THEN ROUND(amount / 3, 2)
    				WHEN "recurringType" = 'yearly' THEN ROUND(amount / 12, 2)
    				ELSE NULL
    			END AS "monthlyAmount",
    			CASE
    				WHEN "recurringType" = 'monthly' THEN ROUND(amount * 3, 2)
    				WHEN "recurringType" = 'quarterly' THEN amount
    				WHEN "recurringType" = 'yearly' THEN ROUND(amount / 4, 2)
    				ELSE NULL
    			END AS "quarterlyAmount",
    			CASE
    				WHEN "recurringType" = 'monthly' THEN ROUND(amount * 12, 2)
    				WHEN "recurringType" = 'quarterly' THEN ROUND(amount * 4, 2)
    				WHEN "recurringType" = 'yearly' THEN amount
    				ELSE NULL
    			END AS "yearlyAmount"
    		FROM public.recurring_expense_entity
    		WHERE "userId" = '${userId}'
    		AND "recurringType" NOT IN ('weekly', 'custom')
    	) filtered
    	GROUP BY category
    	ORDER BY category
    	;
      `;
    return this.datasource.query<IHouseholdExpensePerCategory[]>(sql);
  }

  async getHouseholdIncomesPerCategoryForUser(
    userId: string,
  ): Promise<IHouseholdIncomePerCategory[]> {
    const sql = `
      SELECT category,
    		SUM("monthlyAmount") AS "monthlyAmount",
    		SUM("quarterlyAmount") AS "quarterlyAmount",
    		SUM("yearlyAmount") AS "yearlyAmount"
    	FROM (
    		SELECT description,
    			category,
    			"recurringType",
    			CASE
    				WHEN "recurringType" = 'monthly' THEN amount
    				WHEN "recurringType" = 'quarterly' THEN ROUND(amount / 3, 2)
    				WHEN "recurringType" = 'yearly' THEN ROUND(amount / 12, 2)
    				ELSE NULL
    			END AS "monthlyAmount",
    			CASE
    				WHEN "recurringType" = 'monthly' THEN ROUND(amount * 3, 2)
    				WHEN "recurringType" = 'quarterly' THEN amount
    				WHEN "recurringType" = 'yearly' THEN ROUND(amount / 4, 2)
    				ELSE NULL
    			END AS "quarterlyAmount",
    			CASE
    				WHEN "recurringType" = 'monthly' THEN ROUND(amount * 12, 2)
    				WHEN "recurringType" = 'quarterly' THEN ROUND(amount * 4, 2)
    				WHEN "recurringType" = 'yearly' THEN amount
    				ELSE NULL
    			END AS "yearlyAmount"
    		FROM public.recurring_income_entity
    		WHERE "userId" = '${userId}'
    		AND "recurringType" NOT IN ('weekly', 'custom')
    	) filtered
    	GROUP BY category
    	ORDER BY category
    	;
      `;
    return this.datasource.query<IHouseholdIncomePerCategory[]>(sql);
  }
}
