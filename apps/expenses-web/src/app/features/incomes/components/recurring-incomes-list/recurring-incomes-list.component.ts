import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { SpinnerService } from '../../../../shell/spinner/spinner.service';
import { RecurringIncomesService } from '../../recurring-incomes.service';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { DataView } from 'primeng/dataview';
import { RecurringIncomesFilterComponent } from './filter/recurring-incomes-filter.component';
import { NgClass, AsyncPipe } from '@angular/common';
import { Menu } from 'primeng/menu';
import { Button } from 'primeng/button';
import { FormatDatePipe } from '../../../../shared/pipes/format-date.pipe';
import { FormatCurrencyPipe } from '../../../../shared/pipes/format-currency.pipe';
import { CapitalizePipe } from '../../../../shared/pipes/capitalize.pipe';

@Component({
  selector: 'app-recurring-incomes-list',
  templateUrl: 'recurring-incomes-list.component.html',
  styleUrls: ['./recurring-incomes-list.component.scss'],
  imports: [
    DataView,
    RecurringIncomesFilterComponent,
    NgClass,
    Menu,
    Button,
    AsyncPipe,
    FormatDatePipe,
    FormatCurrencyPipe,
    CapitalizePipe,
  ],
})
export class RecurringIncomesListComponent implements OnInit, OnDestroy {
  actionMenuItems$: BehaviorSubject<MenuItem[]> = new BehaviorSubject(
    [] as MenuItem[],
  );
  recurringIncomes$ = this.service.recurringIncomes$;

  private destory$ = new Subject<void>();

  constructor(
    private service: RecurringIncomesService,
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
  onMenuShow(recurringIncomeId: string) {
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
              item: 'this recurring income',
            }),
            header: this.translateService.instant('dialogs.delete.header'),
            icon: 'pi pi-info-circle',
            acceptButtonStyleClass: 'p-button-danger p-button-text',
            rejectButtonStyleClass: 'p-button-text p-button-text',
            acceptIcon: 'none',
            rejectIcon: 'none',

            accept: () => {
              this.service.delete(recurringIncomeId);
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
