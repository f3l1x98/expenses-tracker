import { ICreateExpenseDto } from './create-expense.dto';

export interface IUpdateExpenseDto extends Partial<ICreateExpenseDto> {}
