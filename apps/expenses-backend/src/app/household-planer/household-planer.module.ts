import { Module } from '@nestjs/common';
import { HouseholdPlanerController } from './household-planer.controller';
import { HouseholdPlanerService } from './household-planer.service';

@Module({
  imports: [],
  controllers: [HouseholdPlanerController],
  providers: [HouseholdPlanerService],
})
export class HouseholdPlanerModule {}
