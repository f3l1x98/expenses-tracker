import {
  Component,
  inject,
  effect,
  WritableSignal,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { SpinnerStore } from '../../../../shell/spinner/spinner.store';
import { RecurringExpensesStore } from '../../recurring-expenses.store';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { DataView } from 'primeng/dataview';
import { RecurringExpensesFilterComponent } from './filter/recurring-expenses-filter.component';
import { NgClass } from '@angular/common';
import { Menu } from 'primeng/menu';
import { Button } from 'primeng/button';
import { FormatDatePipe } from '../../../../shared/pipes/format-date.pipe';
import { FormatCurrencyPipe } from '../../../../shared/pipes/format-currency.pipe';
import { CapitalizePipe } from '../../../../shared/pipes/capitalize.pipe';

@Component({
  selector: 'app-recurring-expenses-list',
  templateUrl: 'recurring-expenses-list.component.html',
  styleUrls: ['./recurring-expenses-list.component.scss'],
  imports: [
    DataView,
    RecurringExpensesFilterComponent,
    NgClass,
    Menu,
    Button,
    FormatDatePipe,
    FormatCurrencyPipe,
    CapitalizePipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecurringExpensesListComponent {
  #store = inject(RecurringExpensesStore);
  #spinnerStore = inject(SpinnerStore);
  #confirmationService = inject(ConfirmationService);
  #translateService = inject(TranslateService);

  actionMenuItems: WritableSignal<MenuItem[]> = signal([]);
  recurringExpenses = this.#store.entities;

  constructor() {
    effect(() => {
      const loadStatus = this.#store.loadStatus();
      this.#spinnerStore.setState(loadStatus.status === 'pending');
    });
    effect(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const filters = this.#store.filter();
      this.#store.loadRecurringExpenses();
    });
  }

  // Workaround as described in https://github.com/primefaces/primeng/issues/13934#issuecomment-1887208083
  // due to issue still not resolved
  onMenuShow(recurringExpenseId: string) {
    this.actionMenuItems.set([
      {
        label: this.#translateService.instant('actionMenu.items.edit'),
        icon: 'pi pi-pencil',
        command() {
          console.log('TODO EDIT');
        },
      },
      // TODO pause/resume (needs paused flag to change option)
      {
        label: this.#translateService.instant('actionMenu.items.delete'),
        icon: 'pi pi-trash',
        command: () => {
          this.#confirmationService.confirm({
            message: this.#translateService.instant('dialogs.delete.message', {
              item: 'this recurring expense',
            }),
            header: this.#translateService.instant('dialogs.delete.header'),
            icon: 'pi pi-info-circle',
            acceptButtonStyleClass: 'p-button-danger p-button-text',
            rejectButtonStyleClass: 'p-button-text p-button-text',
            acceptIcon: 'none',
            rejectIcon: 'none',

            accept: () => {
              this.#store.deleteRecurringExpense(recurringExpenseId);
            },
          });
        },
      },
    ]);
  }
}
