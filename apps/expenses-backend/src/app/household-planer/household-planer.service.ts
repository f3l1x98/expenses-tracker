import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import {
  IHouseholdExpense,
  IHouseholdIncome,
  IHouseholdExpensePerCategory,
  ExpenseCategory,
  RecurringType,
  IncomeCategory,
  AmountPerInterval,
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
    		COALESCE(SUM("monthlyAmount"), 0.0) AS "monthlyAmount",
    		COALESCE(SUM("quarterlyAmount"), 0.0) AS "quarterlyAmount",
    		COALESCE(SUM("yearlyAmount"), 0.0) AS "yearlyAmount"
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
    return (
      await this.datasource.query<
        {
          description: string;
          amount: string;
          category: ExpenseCategory;
          recurringType: RecurringType;
          monthlyAmount: string;
          quarterlyAmount: string;
          yearlyAmount: string;
        }[]
      >(sql)
    ).map((row) => ({
      ...row,
      amount: Number.parseFloat(row.amount),
      monthlyAmount: Number.parseFloat(row.monthlyAmount),
      quarterlyAmount: Number.parseFloat(row.monthlyAmount),
      yearlyAmount: Number.parseFloat(row.monthlyAmount),
    }));
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
    		COALESCE(SUM("monthlyAmount"), 0.0) AS "monthlyAmount",
    		COALESCE(SUM("quarterlyAmount"), 0.0) AS "quarterlyAmount",
    		COALESCE(SUM("yearlyAmount"), 0.0) AS "yearlyAmount"
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
    return (
      await this.datasource.query<
        {
          description: string;
          amount: string;
          category: IncomeCategory;
          recurringType: RecurringType;
          monthlyAmount: string;
          quarterlyAmount: string;
          yearlyAmount: string;
        }[]
      >(sql)
    ).map((row) => ({
      ...row,
      amount: Number.parseFloat(row.amount),
      monthlyAmount: Number.parseFloat(row.monthlyAmount),
      quarterlyAmount: Number.parseFloat(row.monthlyAmount),
      yearlyAmount: Number.parseFloat(row.monthlyAmount),
    }));
  }

  async getHouseholdExpensesPerCategoryForUser(
    userId: string,
  ): Promise<IHouseholdExpensePerCategory[]> {
    const sql = `
      SELECT category,
    		COALESCE(SUM("monthlyAmount"), 0.0) AS "monthlyAmount",
    		COALESCE(SUM("quarterlyAmount"), 0.0) AS "quarterlyAmount",
    		COALESCE(SUM("yearlyAmount"), 0.0) AS "yearlyAmount"
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
    return (
      await this.datasource.query<
        {
          category: ExpenseCategory;
          // String as typeorm parses postgres decimal to string
          monthlyAmount: string;
          quarterlyAmount: string;
          yearlyAmount: string;
        }[]
      >(sql)
    ).map((row) => ({
      ...row,
      monthlyAmount: Number.parseFloat(row.monthlyAmount),
      quarterlyAmount: Number.parseFloat(row.monthlyAmount),
      yearlyAmount: Number.parseFloat(row.monthlyAmount),
    }));
  }

  async getTotalHouseholdExpenseForUser(
    userId: string,
  ): Promise<AmountPerInterval> {
    const sql = `
      SELECT COALESCE(SUM("monthlyAmount"), 0.0) AS "monthlyAmount",
    		COALESCE(SUM("quarterlyAmount"), 0.0) AS "quarterlyAmount",
    		COALESCE(SUM("yearlyAmount"), 0.0) AS "yearlyAmount"
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
    	GROUP BY GROUPING SETS (())
    	;
      `;
    return (
      await this.datasource.query<
        {
          monthlyAmount: string;
          quarterlyAmount: string;
          yearlyAmount: string;
        }[]
      >(sql)
    ).map((row) => ({
      monthlyAmount: Number.parseFloat(row.monthlyAmount),
      quarterlyAmount: Number.parseFloat(row.monthlyAmount),
      yearlyAmount: Number.parseFloat(row.monthlyAmount),
    }))[0];
  }
  async getTotalHouseholdIncomeForUser(
    userId: string,
  ): Promise<AmountPerInterval> {
    const sql = `
      SELECT COALESCE(SUM("monthlyAmount"), 0.0) AS "monthlyAmount",
    		COALESCE(SUM("quarterlyAmount"), 0.0) AS "quarterlyAmount",
    		COALESCE(SUM("yearlyAmount"), 0.0) AS "yearlyAmount"
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
    	GROUP BY GROUPING SETS (())
    	;
      `;
    return (
      await this.datasource.query<
        {
          monthlyAmount: string;
          quarterlyAmount: string;
          yearlyAmount: string;
        }[]
      >(sql)
    ).map((row) => ({
      monthlyAmount: Number.parseFloat(row.monthlyAmount),
      quarterlyAmount: Number.parseFloat(row.monthlyAmount),
      yearlyAmount: Number.parseFloat(row.monthlyAmount),
    }))[0];
  }
}
