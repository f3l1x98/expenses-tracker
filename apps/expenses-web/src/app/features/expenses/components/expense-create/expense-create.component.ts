import { Component, computed, inject, Signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ExpenseCategory } from 'expenses-shared';
import { ExpensesStore } from '../../expenses.store';
import { RecurringExpensesStore } from '../../recurring-expenses.store';
import { validateDateAfter } from '../../../../shared/validators/validate-date-after';
import { UserStore } from '../../../../shell/user/user.store';
import { RecurringType } from 'expenses-shared';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import { InputNumber } from 'primeng/inputnumber';
import { ExpenseCategoryDropdownComponent } from '../expense-category-dropdown/expense-category-dropdown.component';
import { RadioButton } from 'primeng/radiobutton';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
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
    SelectModule,
    DatePickerModule,
    Button,
    TranslateModule,
  ],
  // TODO ACTIVATE AFTER SWITCH TO SIGNALS changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpenseCreateComponent {
  #expensesStore = inject(ExpensesStore);
  #recurringExpensesStore = inject(RecurringExpensesStore);
  #userStore = inject(UserStore);

  formGroup: FormGroup = new FormGroup({
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
    startDate: new FormControl<Date>(new Date(), {
      nonNullable: true,
      validators: [
        Validators.required,
        validateDateAfter({ value: new Date() }),
      ],
    }),
    endDate: new FormControl<Date | undefined>(undefined, {
      nonNullable: true,
      validators: [validateDateAfter({ formControlName: 'startDate' })],
    }),
  });
  recurringTypeOptions = Object.values(RecurringType);

  currency: Signal<string> = computed(
    () => this.#userStore.own()?.settings.currency ?? 'EUR',
  );

  //user = this.#userStore.own;

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
      this.#recurringExpensesStore.createRecurringExpense({
        description: description,
        category: category,
        amount: amount,
        recurringType: recurringType,
        startDate: startDate,
        endDate: endDate,
      });
    } else {
      this.#expensesStore.createExpense({
        description: description,
        category: category,
        amount: amount,
      });
    }
    this.formGroup.reset();
  }
}
