import { Price } from '../../../../shared/interfaces/price.interface';
import { User } from '../../../../shared/interfaces/user.interface';

export interface Expense {
  id: string;
  price: Price;
  category: string;
  user: User;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  //recurringExpense?: IRecurringExpense;
}
