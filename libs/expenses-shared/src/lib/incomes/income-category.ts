export enum IncomeCategory {
  GIFT = 'gift',
  MISC = 'misc',
  SALARY = 'salary',
  STOCKS = 'stocks',
}

const categoryColors: { [key in IncomeCategory]: string } = {
  [IncomeCategory.GIFT]: '--p-yellow-500',
  [IncomeCategory.MISC]: '--p-blue-500',
  [IncomeCategory.SALARY]: '--p-green-500',
  [IncomeCategory.STOCKS]: '--p-purple-500',
};

export function getIncomeCategoryColor(category: IncomeCategory): string {
  return categoryColors[category];
}
