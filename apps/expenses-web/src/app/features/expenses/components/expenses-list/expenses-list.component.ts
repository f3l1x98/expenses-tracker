import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  combineLatestWith,
  map,
  Subject,
  take,
  takeUntil,
} from 'rxjs';
import { SpinnerStore } from '../../../../shell/spinner/spinner.store';
import { ExpensesService } from '../../expenses.service';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { DataView } from 'primeng/dataview';
import { ExpensesFilterComponent } from './expenses-filter/expenses-filter.component';
import { NgClass, AsyncPipe, CommonModule } from '@angular/common';
import { Menu } from 'primeng/menu';
import { Button } from 'primeng/button';
import { FormatDatePipe } from '../../../../shared/pipes/format-date.pipe';
import { FormatCurrencyPipe } from '../../../../shared/pipes/format-currency.pipe';
import { InputNumber } from 'primeng/inputnumber';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IExpense } from 'expenses-shared';
import { UserStore } from '../../../../shell/user/user.store';

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
    AsyncPipe,
    FormatDatePipe,
    FormatCurrencyPipe,
    InputNumber,
  ],
})
export class ExpensesListComponent implements OnInit, OnDestroy {
  #service: ExpensesService = inject(ExpensesService);
  #spinnerStore = inject(SpinnerStore);
  #confirmationService: ConfirmationService = inject(ConfirmationService);
  #translateService: TranslateService = inject(TranslateService);
  #userStore = inject(UserStore);
  #formBuilder: FormBuilder = inject(FormBuilder);

  actionMenuItems$: BehaviorSubject<MenuItem[]> = new BehaviorSubject(
    [] as MenuItem[],
  );
  editFormGroup!: FormGroup;
  expenses$ = this.#service.expenses$;
  updateStatus$ = this.#service.updateStatus$;

  user = this.#userStore.own;

  private destory$ = new Subject<void>();

  ngOnInit() {
    this.#service.loadStatus$
      .pipe(takeUntil(this.destory$))
      .subscribe((status) => {
        console.log('UPDATE STATE:');
        console.log(status);
        this.#spinnerStore.setState(status.status === 'pending');
      });
    this.load();

    this.editFormGroup = this.#formBuilder.group({
      description: new FormControl<string | null>(null, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      amount: new FormControl<number | null>(null, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(0)],
      }),
    });
  }

  ngOnDestroy(): void {
    this.destory$.next();
    this.destory$.complete();
  }

  // Workaround as described in https://github.com/primefaces/primeng/issues/13934#issuecomment-1887208083
  // due to issue still not resolved
  onMenuShow(expense: IExpense) {
    this.actionMenuItems$
      .pipe(
        combineLatestWith(this.updateStatus$),
        map(([_, updateStatus]) => [
          {
            label: this.#translateService.instant('actionMenu.items.edit'),
            icon: 'pi pi-pencil',
            disabled: updateStatus.isEdit,
            command: () => {
              this.editFormGroup.patchValue({
                description: expense.description,
                amount: expense.amount,
              });
              this.#service.toggleIsEdit(expense.id);
            },
          },
          {
            label: this.#translateService.instant('actionMenu.items.delete'),
            icon: 'pi pi-trash',
            command: () => {
              this.#confirmationService.confirm({
                message: this.#translateService.instant(
                  'dialogs.delete.message',
                  {
                    item: 'this expense',
                  },
                ),
                header: this.#translateService.instant('dialogs.delete.header'),
                icon: 'pi pi-info-circle',
                acceptButtonStyleClass: 'p-button-danger p-button-text',
                rejectButtonStyleClass: 'p-button-text p-button-text',
                acceptIcon: 'none',
                rejectIcon: 'none',

                accept: () => {
                  this.#service.delete(expense.id);
                },
              });
            },
          },
        ]),
        take(1),
      )
      .subscribe((menuItems) => {
        this.actionMenuItems$.next(menuItems);
      });
  }

  onEditCancel(expenseId: string) {
    this.#service.toggleIsEdit(expenseId);
    this.editFormGroup.reset();
  }

  onEditSubmit(expense: IExpense) {
    if (!this.editFormGroup?.valid) return;
    this.#service.update(expense.id, {
      ...expense,
      description: this.editFormGroup.get('description')?.value,
      amount: this.editFormGroup.get('amount')?.value,
    });
    this.#service.toggleIsEdit(expense.id);
  }

  load() {
    this.#service.load();
  }
}
