import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ExpenseCategory } from 'expenses-shared';
import { Subject } from 'rxjs';
import { ExpensesService } from '../../expenses.service';
import { RecurringExpensesService } from '../../recurring-expenses.service';
import { validateDateAfter } from '../../../../shared/validators/validate-date-after';
import { UserService } from '../../../../shell/user/user.service';
import { RecurringType } from 'libs/expenses-shared/src/lib/shared/recurring-type.enum';

@Component({
  selector: 'app-expense-create',
  templateUrl: 'expense-create.component.html',
})
export class ExpenseCreateComponent implements OnInit, OnDestroy {
  formGroup!: FormGroup;
  recurringTypeOptions = Object.values(RecurringType);

  user$ = this.userService.own$;

  private destory$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private expensesService: ExpensesService,
    private recurringExpensesService: RecurringExpensesService,
    private userService: UserService,
  ) {}

  ngOnDestroy(): void {
    this.destory$.next();
    this.destory$.complete();
  }

  ngOnInit() {
    const now = new Date();
    this.formGroup = this.formBuilder.group({
      description: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      category: new FormControl<ExpenseCategory>(ExpenseCategory.MISC, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      isRecurring: new FormControl<boolean>(false, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      amount: new FormControl(0, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(0)],
      }),
      recurringType: new FormControl<RecurringType>(RecurringType.MONTHLY, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      startDate: new FormControl<Date>(now, {
        nonNullable: true,
        validators: [Validators.required, validateDateAfter({ value: now })],
      }),
      endDate: new FormControl<Date | undefined>(undefined, {
        nonNullable: true,
        validators: [validateDateAfter({ formControlName: 'startDate' })],
      }),
    });
  }

  submit() {
    if (!this.formGroup.valid) return;

    const isRecurringCreation: boolean =
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.formGroup.get('isRecurring')!.value;
    const description = this.formGroup.get('description')?.value as string;
    const amount = this.formGroup.get('amount')?.value as number;
    const category = this.formGroup.get('category')?.value as ExpenseCategory;
    if (isRecurringCreation) {
      const recurringType = this.formGroup.get('recurringType')
        ?.value as RecurringType;
      const startDate = this.formGroup.get('startDate')?.value as Date;
      const endDate = this.formGroup.get('endDate')?.value as Date | undefined;
      this.recurringExpensesService.create({
        description: description,
        category: category,
        amount: amount,
        recurringType: recurringType,
        startDate: startDate,
        endDate: endDate,
      });
    } else {
      this.expensesService.create({
        description: description,
        category: category,
        amount: amount,
      });
    }
    this.formGroup.reset();
  }
}
