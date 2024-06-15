import { Environment } from './environment.interface';

export const environment: Environment = {
  name: 'prod',
  production: true,
  api: {
    baseUrl: 'http://localhost:3000/v1',
  },
};
