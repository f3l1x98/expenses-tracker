import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { IncomesStore } from '../../incomes.store';
import { RecurringIncomesStore } from '../../recurring-incomes.store';
import { validateDateAfter } from '../../../../shared/validators/validate-date-after';
import { UserStore } from '../../../../shell/user/user.store';
import { IncomeCategory } from 'expenses-shared';
import { RecurringType } from 'expenses-shared';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import { InputNumber } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { RadioButton } from 'primeng/radiobutton';
import { DatePickerModule } from 'primeng/datepicker';
import { Button } from 'primeng/button';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-income-create',
  templateUrl: 'income-create.component.html',
  imports: [
    ReactiveFormsModule,
    FloatLabel,
    InputText,
    InputNumber,
    SelectModule,
    RadioButton,
    DatePickerModule,
    Button,
    TranslateModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IncomeCreateComponent {
  #incomesStore = inject(IncomesStore);
  #recurringIncomesStore = inject(RecurringIncomesStore);
  #userStore = inject(UserStore);

  formGroup: FormGroup = new FormGroup({
    description: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    category: new FormControl<IncomeCategory>(IncomeCategory.SALARY, {
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
  categoryOptions = Object.values(IncomeCategory);
  recurringTypeOptions = Object.values(RecurringType);

  user = this.#userStore.own;

  submit() {
    if (!this.formGroup.valid) return;

    const isRecurringCreation: boolean =
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.formGroup.get('isRecurring')!.value;
    const description = this.formGroup.get('description')?.value as string;
    const amount = this.formGroup.get('amount')?.value as number;
    const category = this.formGroup.get('category')?.value as IncomeCategory;
    if (isRecurringCreation) {
      const recurringType = this.formGroup.get('recurringType')
        ?.value as RecurringType;
      const startDate = this.formGroup.get('startDate')?.value as Date;
      const endDate = this.formGroup.get('endDate')?.value as Date | undefined;
      this.#recurringIncomesStore.createRecurringIncome({
        description: description,
        category: category,
        amount: amount,
        recurringType: recurringType,
        startDate: startDate,
        endDate: endDate,
      });
    } else {
      this.#incomesStore.createIncome({
        description: description,
        category: category,
        amount: amount,
      });
    }
    this.formGroup.reset();
  }
}
