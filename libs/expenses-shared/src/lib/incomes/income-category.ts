export enum IncomeCategory {
  SALARY = 'salary',
  GIFT = 'gift',
  MISC = 'misc',
  // TODO
}

const categoryColors: { [key in IncomeCategory]: string } = {
  [IncomeCategory.MISC]: '--p-blue-500',
  [IncomeCategory.GIFT]: '--p-yellow-500',
  [IncomeCategory.SALARY]: '--p-green-500',
};

export function getIncomeCategoryColor(category: IncomeCategory): string {
  return categoryColors[category];
}
