export class RecurringExpenseNotFoundException extends Error {
  constructor(id: string) {
    super(`No recurring expense found for ${id}`);
  }
}
