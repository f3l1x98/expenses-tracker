import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { IncomesService } from '../../incomes.service';
import { RecurringIncomesService } from '../../recurring-incomes.service';
import { validateDateAfter } from '../../../../shared/validators/validate-date-after';
import { UserService } from '../../../../shell/user/user.service';
import { IncomeCategory } from 'expenses-shared';
import { RecurringType } from 'libs/expenses-shared/src/lib/shared/recurring-type.enum';

@Component({
  selector: 'app-income-create',
  templateUrl: 'income-create.component.html',
})
export class IncomeCreateComponent implements OnInit, OnDestroy {
  formGroup!: FormGroup;
  categoryOptions = Object.values(IncomeCategory);
  recurringTypeOptions = Object.values(RecurringType);

  user$ = this.userService.own$;

  private destory$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private incomesService: IncomesService,
    private recurringIncomesService: RecurringIncomesService,
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
      this.recurringIncomesService.create({
        description: description,
        category: category,
        amount: amount,
        recurringType: recurringType,
        startDate: startDate,
        endDate: endDate,
      });
    } else {
      this.incomesService.create({
        description: description,
        category: category,
        amount: amount,
      });
    }
    this.formGroup.reset();
  }
}
