import { Module } from '@nestjs/common';
import { HouseholdPlanerController } from './household-planer.controller';
import { HouseholdPlanerService } from './household-planer.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [HouseholdPlanerController],
  providers: [HouseholdPlanerService],
})
export class HouseholdPlanerModule {}
