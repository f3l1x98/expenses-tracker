export class ConfigServiceMock {
  constructor(private readonly config: Record<string, unknown> = {}) {}

  get(key: string): unknown | undefined {
    if (key in this.config) {
      return this.config[key];
    }
    return undefined;
  }
}
