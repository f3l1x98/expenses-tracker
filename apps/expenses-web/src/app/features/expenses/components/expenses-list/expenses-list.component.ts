import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
  WritableSignal,
} from '@angular/core';
import { SpinnerStore } from '../../../../shell/spinner/spinner.store';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { DataView } from 'primeng/dataview';
import { ExpensesFilterComponent } from './expenses-filter/expenses-filter.component';
import { NgClass, CommonModule } from '@angular/common';
import { Menu } from 'primeng/menu';
import { Button } from 'primeng/button';
import { FormatDatePipe } from '../../../../shared/pipes/format-date.pipe';
import { FormatCurrencyPipe } from '../../../../shared/pipes/format-currency.pipe';
import { InputNumber } from 'primeng/inputnumber';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IExpense } from 'expenses-shared';
import { UserStore } from '../../../../shell/user/user.store';
import { ExpensesStore } from '../../expenses.store';

@Component({
  selector: 'app-expenses-list',
  templateUrl: 'expenses-list.component.html',
  styleUrls: ['./expenses-list.component.scss'],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    DataView,
    ExpensesFilterComponent,
    NgClass,
    Menu,
    Button,
    FormatDatePipe,
    FormatCurrencyPipe,
    InputNumber,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpensesListComponent {
  #spinnerStore = inject(SpinnerStore);
  #confirmationService: ConfirmationService = inject(ConfirmationService);
  #translateService: TranslateService = inject(TranslateService);
  #userStore = inject(UserStore);
  #store = inject(ExpensesStore);

  actionMenuItems: WritableSignal<MenuItem[]> = signal([]);
  editFormGroup: FormGroup = new FormGroup({
    description: new FormControl<string | null>(null, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    amount: new FormControl<number | null>(null, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0)],
    }),
  });
  expenses = this.#store.entities;
  isEdit = this.#store.updateStatus.isEdit;
  editingId = this.#store.updateStatus.editingId;

  user = this.#userStore.own;

  constructor() {
    effect(() => {
      const loadStatus = this.#store.loadStatus();
      this.#spinnerStore.setState(loadStatus.status === 'pending');
    });
    effect(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const filters = this.#store.filter();
      this.#store.loadExpenses();
    });
  }

  // Workaround as described in https://github.com/primefaces/primeng/issues/13934#issuecomment-1887208083
  // due to issue still not resolved
  onMenuShow(expense: IExpense) {
    this.actionMenuItems.set([
      {
        label: this.#translateService.instant('actionMenu.items.edit'),
        icon: 'pi pi-pencil',
        disabled: this.#store.updateStatus()?.isEdit ?? false,
        command: () => {
          this.editFormGroup.patchValue({
            description: expense.description,
            amount: expense.amount,
          });
          this.#store.toggleIsEdit(expense.id);
        },
      },
      {
        label: this.#translateService.instant('actionMenu.items.delete'),
        icon: 'pi pi-trash',
        command: () => {
          this.#confirmationService.confirm({
            message: this.#translateService.instant('dialogs.delete.message', {
              item: 'this expense',
            }),
            header: this.#translateService.instant('dialogs.delete.header'),
            icon: 'pi pi-info-circle',
            acceptButtonStyleClass: 'p-button-danger p-button-text',
            rejectButtonStyleClass: 'p-button-text p-button-text',
            acceptIcon: 'none',
            rejectIcon: 'none',

            accept: () => {
              this.#store.deleteExpense(expense.id);
            },
          });
        },
      },
    ]);
  }

  onEditCancel(expenseId: string) {
    this.#store.toggleIsEdit(expenseId);
    this.editFormGroup.reset();
  }

  onEditSubmit(expense: IExpense) {
    if (!this.editFormGroup?.valid) return;
    this.#store.updateExpense({
      id: expense.id,
      dto: {
        ...expense,
        description: this.editFormGroup.get('description')?.value,
        amount: this.editFormGroup.get('amount')?.value,
      },
    });
    this.#store.toggleIsEdit(expense.id);
  }
}
