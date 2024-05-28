import { Environment } from './environment.interface';

export const environment: Environment = {
  name: 'dev',
  production: false,
  api: {
    baseUrl: 'http://localhost:3000/v1',
  },
};
