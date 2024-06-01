import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { SpinnerService } from '../../../../shell/spinner/spinner.service';
import { ExpensesService } from '../../expenses.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-expenses-list',
  templateUrl: 'expenses-list.component.html',
})
export class ExpensesListComponent implements OnInit, OnDestroy {
  actionMenuItems: MenuItem[] = [];
  expenses$ = this.service.expenses$;

  private destory$ = new Subject<void>();

  constructor(
    private service: ExpensesService,
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
    this.service.status$
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
