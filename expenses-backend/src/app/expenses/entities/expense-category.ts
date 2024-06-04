export enum ExpenseCategory {
  CAR = 'car',
  INVOICE = 'invoice',
  CLOTHING = 'clothing',
  ENTERTAINMENT = 'entertainment',
  GROCERY = 'grocery',
  HEALTHCARE = 'healthcare',
  VACATION = 'vacation',
  MISC = 'misc',
  // TODO
}

const categoryColors: { [key in ExpenseCategory]: string } = {
  [ExpenseCategory.CAR]: '--green-500',
  [ExpenseCategory.CLOTHING]: '--green-500',
  [ExpenseCategory.ENTERTAINMENT]: '--green-500',
  [ExpenseCategory.GROCERY]: '--green-500',
  [ExpenseCategory.HEALTHCARE]: '--green-500',
  [ExpenseCategory.INVOICE]: '--green-500',
  [ExpenseCategory.MISC]: '--green-500',
  [ExpenseCategory.VACATION]: '--green-500',
};

export function getExpenseCategoryColor(
  expenseCategory: ExpenseCategory,
): string {
  return categoryColors[expenseCategory];
}
