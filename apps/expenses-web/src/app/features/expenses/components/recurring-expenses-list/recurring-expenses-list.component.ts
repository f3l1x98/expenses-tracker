import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { SpinnerService } from '../../../../shell/spinner/spinner.service';
import { RecurringExpensesService } from '../../recurring-expenses.service';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

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
    private translateService: TranslateService,
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
        label: this.translateService.instant('actionMenu.items.edit'),
        icon: 'pi pi-pencil',
        command() {
          console.log('TODO EDIT');
        },
      },
      // TODO pause/resume (needs paused flag to change option)
      {
        label: this.translateService.instant('actionMenu.items.delete'),
        icon: 'pi pi-trash',
        command: () => {
          this.confirmationService.confirm({
            message: this.translateService.instant('dialogs.delete.message', {
              item: 'this recurring expense',
            }),
            header: this.translateService.instant('dialogs.delete.header'),
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
