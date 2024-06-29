import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { SpinnerService } from '../../../../shell/spinner/spinner.service';
import { RecurringExpensesService } from '../../recurring-expenses.service';
import { ConfirmationService, MenuItem } from 'primeng/api';

@Component({
  selector: 'app-recurring-expenses-list',
  templateUrl: 'recurring-expenses-list.component.html',
  styleUrls: ['./recurring-expenses-list.component.scss'],
})
export class RecurringExpensesListComponent implements OnInit, OnDestroy {
  actionMenuItems$: BehaviorSubject<MenuItem[]> = new BehaviorSubject(
    [] as MenuItem[],
  );
  recurringExpenses$ = this.service.recurringExpenses$;

  private destory$ = new Subject<void>();

  constructor(
    private service: RecurringExpensesService,
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
  onMenuShow(recurringExpenseId: string) {
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
            message: 'Do you want to delete this recurring expense?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            acceptButtonStyleClass: 'p-button-danger p-button-text',
            rejectButtonStyleClass: 'p-button-text p-button-text',
            acceptIcon: 'none',
            rejectIcon: 'none',

            accept: () => {
              this.service.delete(recurringExpenseId);
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
