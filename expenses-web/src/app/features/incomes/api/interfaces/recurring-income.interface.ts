import { Income } from './income.interface';

export interface RecurringIncome extends Omit<Income, 'recurringIncome'> {
  cron: string;
  startDate?: Date;
  endDate?: Date;
}
