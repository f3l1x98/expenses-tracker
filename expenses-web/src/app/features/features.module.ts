import { NgModule } from '@angular/core';
import { FeaturesComponent } from './features.component';
import { FeaturesRoutingModule } from './features-routing.module';
import { SidebarComponent } from '../shell/sidebar/sidebar.component';

@NgModule({
  imports: [FeaturesRoutingModule, SidebarComponent],
  exports: [],
  declarations: [FeaturesComponent],
  providers: [],
})
export class FeaturesModule {}
