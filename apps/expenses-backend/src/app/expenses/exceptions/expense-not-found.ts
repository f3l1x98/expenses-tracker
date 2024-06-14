export class ExpenseNotFoundException extends Error {
  constructor(id: string) {
    super(`No expense found for ${id}`);
  }
}
