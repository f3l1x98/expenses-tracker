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
  [ExpenseCategory.CAR]: '--blue-500',
  [ExpenseCategory.CLOTHING]: '--yellow-500',
  [ExpenseCategory.ENTERTAINMENT]: '--purple-500',
  [ExpenseCategory.GROCERY]: '--green-500',
  [ExpenseCategory.HEALTHCARE]: '--red-500',
  [ExpenseCategory.INVOICE]: '--orange-500',
  [ExpenseCategory.MISC]: '--gray-500',
  [ExpenseCategory.VACATION]: '--indigo-500',
};

export function getExpenseCategoryColor(
  expenseCategory: ExpenseCategory,
): string {
  return categoryColors[expenseCategory];
}
