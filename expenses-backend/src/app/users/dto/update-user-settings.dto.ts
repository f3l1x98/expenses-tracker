import { PartialType } from '@nestjs/swagger';
import { UserSettingsDto } from './user-settings.dto';

export class UpdateUserSettingsDto extends PartialType(UserSettingsDto) {}
