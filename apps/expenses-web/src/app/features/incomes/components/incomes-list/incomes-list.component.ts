import {
  Component,
  inject,
  ChangeDetectionStrategy,
  WritableSignal,
  signal,
  effect,
} from '@angular/core';
import { IncomesStore } from '../../incomes.store';
import { SpinnerStore } from '../../../../shell/spinner/spinner.store';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { DataView } from 'primeng/dataview';
import { IncomesFilterComponent } from './incomes-filter/incomes-filter.component';
import { NgClass } from '@angular/common';
import { Menu } from 'primeng/menu';
import { Button } from 'primeng/button';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { FormatDatePipe } from '../../../../shared/pipes/format-date.pipe';
import { FormatCurrencyPipe } from '../../../../shared/pipes/format-currency.pipe';

@Component({
  selector: 'app-incomes-list',
  templateUrl: 'incomes-list.component.html',
  styleUrls: ['./incomes-list.component.scss'],
  imports: [
    DataView,
    IncomesFilterComponent,
    NgClass,
    Menu,
    Button,
    ConfirmDialog,
    FormatDatePipe,
    FormatCurrencyPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IncomesListComponent {
  #store = inject(IncomesStore);
  #spinnerStore = inject(SpinnerStore);
  #confirmationService = inject(ConfirmationService);
  #translateService = inject(TranslateService);

  actionMenuItems: WritableSignal<MenuItem[]> = signal([]);
  incomes = this.#store.entities;

  constructor() {
    effect(() => {
      const loadStatus = this.#store.loadStatus();
      this.#spinnerStore.setState(loadStatus.status === 'pending');
    });
    effect(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const filters = this.#store.filter();
      this.#store.loadIncomes();
    });
  }

  // Workaround as described in https://github.com/primefaces/primeng/issues/13934#issuecomment-1887208083
  // due to issue still not resolved
  onMenuShow(incomeId: string) {
    this.actionMenuItems.set([
      {
        label: this.#translateService.instant('actionMenu.items.edit'),
        icon: 'pi pi-pencil',
        command() {
          console.log('TODO EDIT');
        },
      },
      {
        label: this.#translateService.instant('actionMenu.items.delete'),
        icon: 'pi pi-trash',
        command: () => {
          this.#confirmationService.confirm({
            message: this.#translateService.instant('dialogs.delete.message', {
              item: 'this income',
            }),
            header: this.#translateService.instant('dialogs.delete.header'),
            icon: 'pi pi-info-circle',
            acceptButtonStyleClass: 'p-button-danger p-button-text',
            rejectButtonStyleClass: 'p-button-text p-button-text',
            acceptIcon: 'none',
            rejectIcon: 'none',

            accept: () => {
              this.#store.deleteIncome(incomeId);
            },
          });
        },
      },
    ]);
  }
}
