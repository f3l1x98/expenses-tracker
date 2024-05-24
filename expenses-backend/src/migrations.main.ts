import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

import { DbConfigService } from './app/db-config.service';

config();

const configService = new ConfigService();

export default new DataSource(
  new DbConfigService(
    configService,
  ).createTypeOrmOptions() as DataSourceOptions,
);
