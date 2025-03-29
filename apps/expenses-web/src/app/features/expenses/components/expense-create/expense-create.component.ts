import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ExpenseCategory } from 'expenses-shared';
import { Subject } from 'rxjs';
import { ExpensesService } from '../../expenses.service';
import { RecurringExpensesService } from '../../recurring-expenses.service';
import { validateDateAfter } from '../../../../shared/validators/validate-date-after';
import { UserService } from '../../../../shell/user/user.service';
import { RecurringType } from 'expenses-shared';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import { InputNumber } from 'primeng/inputnumber';
import { ExpenseCategoryDropdownComponent } from '../expense-category-dropdown/expense-category-dropdown.component';
import { RadioButton } from 'primeng/radiobutton';
import { NgIf, AsyncPipe } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { Calendar } from 'primeng/calendar';
import { Button } from 'primeng/button';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-expense-create',
  templateUrl: 'expense-create.component.html',
  imports: [
    ReactiveFormsModule,
    FloatLabel,
    InputText,
    InputNumber,
    ExpenseCategoryDropdownComponent,
    RadioButton,
    NgIf,
    DropdownModule,
    Calendar,
    Button,
    AsyncPipe,
    TranslateModule,
  ],
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
