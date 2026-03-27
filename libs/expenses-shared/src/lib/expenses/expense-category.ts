export enum ExpenseCategory {
  CLOTHING = 'clothing',
  EDUCATION = 'education',
  ENTERTAINMENT = 'entertainment',
  FOOD = 'food',
  HEALTHCARE = 'healthcare',
  HOUSING = 'housing',
  INSURANCE = 'insurance',
  MEMBERSHIP = 'membership',
  MISC = 'misc',
  SAVINGS = 'savings',
  SUBSCRIPTION = 'subscription',
  TRANSPORTATION = 'transportation',
  UTILITIES = 'utilities',
  VACATION = 'vacation',
}

const categoryColors: { [key in ExpenseCategory]: string } = {
  [ExpenseCategory.CLOTHING]: '--p-yellow-500',
  [ExpenseCategory.EDUCATION]: '--p-fuchsia-500',
  [ExpenseCategory.ENTERTAINMENT]: '--p-purple-500',
  [ExpenseCategory.FOOD]: '--p-green-500',
  [ExpenseCategory.HEALTHCARE]: '--p-teal-500',
  [ExpenseCategory.HOUSING]: '--p-stone-500',
  [ExpenseCategory.INSURANCE]: '--p-gray-500',
  [ExpenseCategory.MEMBERSHIP]: '--p-cyan-500',
  [ExpenseCategory.MISC]: '--p-amber-800',
  [ExpenseCategory.SAVINGS]: '--p-lime-500',
  [ExpenseCategory.SUBSCRIPTION]: '--p-pink-500',
  [ExpenseCategory.TRANSPORTATION]: '--p-blue-500',
  [ExpenseCategory.UTILITIES]: '--p-orange-500',
  [ExpenseCategory.VACATION]: '--p-indigo-500',
};

export function getExpenseCategoryColor(
  expenseCategory: ExpenseCategory,
): string {
  return categoryColors[expenseCategory];
}
