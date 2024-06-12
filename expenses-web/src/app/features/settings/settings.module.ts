import { NgModule } from '@angular/core';

import { SettingsComponent } from './components/settings.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { AppContentWrapperComponent } from '../../shared/components/app-content-wrapper/app-content-wrapper.component';

@NgModule({
  imports: [SettingsRoutingModule, AppContentWrapperComponent],
  exports: [],
  declarations: [SettingsComponent],
  providers: [],
})
export class SettingsModule {}
