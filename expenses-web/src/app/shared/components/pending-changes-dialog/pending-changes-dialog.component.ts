import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-pending-changes-dialog',
  templateUrl: 'pending-changes-dialog.component.html',
  standalone: true,
  imports: [ConfirmDialogModule, ButtonModule],
})
export class PendingChangesDialogComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
