import { PartialType } from '@nestjs/swagger';
import { UserSettingsDto } from './user-settings.dto';
import { IUpdateUserSettingsDto } from 'expenses-shared';

export class UpdateUserSettingsDto
  extends PartialType(UserSettingsDto)
  implements IUpdateUserSettingsDto {}
