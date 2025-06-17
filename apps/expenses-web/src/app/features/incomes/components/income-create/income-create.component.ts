import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { IncomesService } from '../../incomes.service';
import { RecurringIncomesService } from '../../recurring-incomes.service';
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
})
export class IncomeCreateComponent implements OnInit, OnDestroy {
  #formBuilder = inject(FormBuilder);
  #incomesService = inject(IncomesService);
  #recurringIncomesService = inject(RecurringIncomesService);
  #userStore = inject(UserStore);

  formGroup!: FormGroup;
  categoryOptions = Object.values(IncomeCategory);
  recurringTypeOptions = Object.values(RecurringType);

  user = this.#userStore.own;

  private destory$ = new Subject<void>();

  ngOnDestroy(): void {
    this.destory$.next();
    this.destory$.complete();
  }

  ngOnInit() {
    const now = new Date();
    this.formGroup = this.#formBuilder.group({
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
    const category = this.formGroup.get('category')?.value as IncomeCategory;
    if (isRecurringCreation) {
      const recurringType = this.formGroup.get('recurringType')
        ?.value as RecurringType;
      const startDate = this.formGroup.get('startDate')?.value as Date;
      const endDate = this.formGroup.get('endDate')?.value as Date | undefined;
      this.#recurringIncomesService.create({
        description: description,
        category: category,
        amount: amount,
        recurringType: recurringType,
        startDate: startDate,
        endDate: endDate,
      });
    } else {
      this.#incomesService.create({
        description: description,
        category: category,
        amount: amount,
      });
    }
    this.formGroup.reset();
  }
}
