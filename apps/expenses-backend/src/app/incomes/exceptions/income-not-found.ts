export class IncomeNotFoundException extends Error {
  constructor(id: string) {
    super(`No income found for ${id}`);
  }
}
