import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  combineLatestWith,
  map,
  Subject,
  take,
  takeUntil,
} from 'rxjs';
import { SpinnerService } from '../../../../shell/spinner/spinner.service';
import { ExpensesService } from '../../expenses.service';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { DataView } from 'primeng/dataview';
import { ExpensesFilterComponent } from './expenses-filter/expenses-filter.component';
import { NgFor, NgClass, AsyncPipe, CommonModule } from '@angular/common';
import { Menu } from 'primeng/menu';
import { Button } from 'primeng/button';
import { FormatDatePipe } from '../../../../shared/pipes/format-date.pipe';
import { FormatCurrencyPipe } from '../../../../shared/pipes/format-currency.pipe';
import { InputNumber } from 'primeng/inputnumber';
import { UserService } from '../../../../shell/user/user.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IExpense } from 'expenses-shared';

@Component({
  selector: 'app-expenses-list',
  templateUrl: 'expenses-list.component.html',
  styleUrls: ['./expenses-list.component.scss'],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    DataView,
    ExpensesFilterComponent,
    NgFor,
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
  actionMenuItems$: BehaviorSubject<MenuItem[]> = new BehaviorSubject(
    [] as MenuItem[],
  );
  editFormGroups!: Map<string, FormGroup>;
  expenses$ = this.service.expenses$;
  updateStatus$ = this.service.updateStatus$;

  user$ = this.userService.own$;

  private destory$ = new Subject<void>();

  constructor(
    private service: ExpensesService,
    private spinnerService: SpinnerService,
    private confirmationService: ConfirmationService,
    private translateService: TranslateService,
    private userService: UserService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    this.service.loadStatus$
      .pipe(takeUntil(this.destory$))
      .subscribe((status) =>
        this.spinnerService.setState({ active: status.status === 'pending' }),
      );
    this.load();

    this.expenses$.pipe(takeUntil(this.destory$)).subscribe((expenses) => {
      this.editFormGroups = new Map(
        expenses.map((expense) => [
          expense.id,
          this.formBuilder.group({
            description: new FormControl(expense.description, {
              nonNullable: true,
              validators: [Validators.required],
            }),
            amount: new FormControl(expense.amount, {
              nonNullable: true,
              validators: [Validators.required, Validators.min(0)],
            }),
          }),
        ]),
      );
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
            label: this.translateService.instant('actionMenu.items.edit'),
            icon: 'pi pi-pencil',
            disabled: updateStatus[expense.id].isEdit,
            command: () => {
              this.service.toggleIsEdit(expense.id);
            },
          },
          {
            label: this.translateService.instant('actionMenu.items.delete'),
            icon: 'pi pi-trash',
            command: () => {
              this.confirmationService.confirm({
                message: this.translateService.instant(
                  'dialogs.delete.message',
                  {
                    item: 'this expense',
                  },
                ),
                header: this.translateService.instant('dialogs.delete.header'),
                icon: 'pi pi-info-circle',
                acceptButtonStyleClass: 'p-button-danger p-button-text',
                rejectButtonStyleClass: 'p-button-text p-button-text',
                acceptIcon: 'none',
                rejectIcon: 'none',

                accept: () => {
                  this.service.delete(expense.id);
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
    this.service.toggleIsEdit(expenseId);
    this.editFormGroups.get(expenseId)?.reset();
  }

  onEditSubmit(expense: IExpense) {
    const editFormGroup = this.editFormGroups.get(expense.id);
    if (!editFormGroup?.valid) return;
    this.service.update(expense.id, {
      ...expense,
      description: editFormGroup.get('description')?.value,
      amount: editFormGroup.get('amount')?.value,
    });
    this.service.toggleIsEdit(expense.id);
  }

  load() {
    this.service.load();
  }
}
