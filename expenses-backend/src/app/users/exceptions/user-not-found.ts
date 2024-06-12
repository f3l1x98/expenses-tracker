export class UserNotFoundException extends Error {
  constructor(id: string) {
    super(`No user found for ${id}`);
  }
}
