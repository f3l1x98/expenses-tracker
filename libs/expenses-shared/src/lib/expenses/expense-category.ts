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
  [ExpenseCategory.CAR]: '--p-blue-500',
  [ExpenseCategory.CLOTHING]: '--p-yellow-500',
  [ExpenseCategory.ENTERTAINMENT]: '--p-purple-500',
  [ExpenseCategory.GROCERY]: '--p-green-500',
  [ExpenseCategory.HEALTHCARE]: '--p-red-500',
  [ExpenseCategory.INVOICE]: '--p-orange-500',
  [ExpenseCategory.MISC]: '--p-gray-500',
  [ExpenseCategory.VACATION]: '--p-indigo-500',
};

export function getExpenseCategoryColor(
  expenseCategory: ExpenseCategory,
): string {
  return categoryColors[expenseCategory];
}
