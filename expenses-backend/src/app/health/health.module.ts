import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
  imports: [TerminusModule],
  controllers: [HealthController],
  providers: [],
})
export class HealthModule {}
