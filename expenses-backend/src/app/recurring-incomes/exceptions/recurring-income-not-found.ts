export class RecurringIncomeNotFoundException extends Error {
  constructor(id: string) {
    super(`No recurring income found for ${id}`);
  }
}
