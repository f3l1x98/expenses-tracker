import { NgModule } from '@angular/core';

import { SettingsComponent } from './components/settings.component';
import { SettingsRoutingModule } from './settings-routing.module';

@NgModule({
  imports: [SettingsRoutingModule],
  exports: [],
  declarations: [SettingsComponent],
  providers: [],
})
export class SettingsModule {}
