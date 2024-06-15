import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { SpinnerService } from '../../../../shell/spinner/spinner.service';
import { ExpensesService } from '../../expenses.service';
import { ConfirmationService, MenuItem } from 'primeng/api';

@Component({
  selector: 'app-expenses-list',
  templateUrl: 'expenses-list.component.html',
})
export class ExpensesListComponent implements OnInit, OnDestroy {
  actionMenuItems$: BehaviorSubject<MenuItem[]> = new BehaviorSubject(
    [] as MenuItem[],
  );
  expenses$ = this.service.expenses$;

  private destory$ = new Subject<void>();

  constructor(
    private service: ExpensesService,
    private spinnerService: SpinnerService,
    private confirmationService: ConfirmationService,
  ) {}

  ngOnInit() {
    this.service.loadStatus$
      .pipe(takeUntil(this.destory$))
      .subscribe((status) =>
        this.spinnerService.setState({ active: status.status === 'pending' }),
      );
    this.load();
  }

  ngOnDestroy(): void {
    this.destory$.next();
    this.destory$.complete();
  }

  // Workaround as described in https://github.com/primefaces/primeng/issues/13934#issuecomment-1887208083
  // due to issue still not resolved
  onMenuShow(expenseId: string) {
    this.actionMenuItems$.next([
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
        command: () => {
          this.confirmationService.confirm({
            message: 'Do you want to delete this expense?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            acceptButtonStyleClass: 'p-button-danger p-button-text',
            rejectButtonStyleClass: 'p-button-text p-button-text',
            acceptIcon: 'none',
            rejectIcon: 'none',

            accept: () => {
              this.service.delete(expenseId);
            },
          });
        },
      },
    ]);
  }

  load() {
    this.service.load();
  }
}
