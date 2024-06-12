export interface Environment {
  name: string;
  production: boolean;
  api: {
    baseUrl: string;
  };
}
