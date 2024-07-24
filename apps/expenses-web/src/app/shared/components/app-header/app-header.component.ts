import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: 'app-header.component.html',
  standalone: true,
  imports: [TranslateModule],
})
export class AppHeaderComponent {}
