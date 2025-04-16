import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-pending-changes-dialog',
  templateUrl: 'pending-changes-dialog.component.html',
  imports: [ConfirmDialogModule, ButtonModule, TranslateModule],
})
export class PendingChangesDialogComponent {}
