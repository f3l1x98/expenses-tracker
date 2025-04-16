import { Component } from '@angular/core';
import { SidebarComponent } from '../shell/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-features',
  templateUrl: 'features.component.html',
  styleUrls: ['./features.component.scss'],
  imports: [SidebarComponent, RouterOutlet],
})
export class FeaturesComponent {}
