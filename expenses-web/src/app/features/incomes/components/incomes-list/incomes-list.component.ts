import { Component, OnInit } from '@angular/core';
import { IncomesService } from '../../incomes.service';
import { SpinnerService } from '../../../../shell/spinner/spinner.service';
import { Subject, takeUntil } from 'rxjs';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-incomes-list',
  templateUrl: 'incomes-list.component.html',
})
export class IncomesListComponent implements OnInit {
  actionMenuItems: MenuItem[] = [];
  incomes$ = this.service.incomes$;

  private destory$ = new Subject<void>();

  constructor(
    private service: IncomesService,
    private spinnerService: SpinnerService
  ) {}

  ngOnInit() {
    this.actionMenuItems = [
      {
        label: 'Edit',
        icon: 'pi pi-pencil',
        command() {
          console.log('TODO EDIT');
        },
      },
      {
        label: 'Delete',
        icon: 'pi pi-trash',
        command() {
          console.log('TODO DELETE');
        },
      },
    ];
    this.service.loadStatus$
      .pipe(takeUntil(this.destory$))
      .subscribe((status) =>
        this.spinnerService.setState({ active: status.status === 'pending' })
      );
    this.load();
  }

  ngOnDestroy(): void {
    this.destory$.next();
    this.destory$.complete();
  }

  load() {
    this.service.load();
  }
}
