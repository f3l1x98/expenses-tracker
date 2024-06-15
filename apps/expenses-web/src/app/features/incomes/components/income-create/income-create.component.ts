import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IncomeCategory } from '../../api/interfaces/income-category';
import { Subject } from 'rxjs';
import { IncomesService } from '../../incomes.service';
import { RecurringIncomesService } from '../../recurring-incomes.service';
import { RecurringCycle } from '../../../../shared/interfaces/recurring-cycle.enum';
import { validateDateAfter } from '../../../../shared/validators/validate-date-after';
import { constructCron } from '../../../../shared/utils/cron-utils';
import { UserService } from '../../../../shell/user/user.service';

@Component({
  selector: 'app-income-create',
  templateUrl: 'income-create.component.html',
})
export class IncomeCreateComponent implements OnInit, OnDestroy {
  formGroup!: FormGroup;
  categoryOptions = Object.values(IncomeCategory);
  recurringCycleOptions = Object.values(RecurringCycle);

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
      recurringCycle: new FormControl<RecurringCycle>(RecurringCycle.MONTHLY, {
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
      this.formGroup.get('isRecurring')!.value;
    const description = this.formGroup.get('description')?.value as string;
    const amount = this.formGroup.get('amount')?.value as number;
    const category = this.formGroup.get('category')?.value as IncomeCategory;
    if (isRecurringCreation) {
      const recurringCycle = this.formGroup.get('recurringCycle')
        ?.value as RecurringCycle;
      const startDate = this.formGroup.get('startDate')?.value as Date;
      const endDate = this.formGroup.get('endDate')?.value as Date | undefined;
      this.recurringIncomesService.create({
        description: description,
        category: category,
        amount: amount,
        cron: constructCron(recurringCycle, startDate),
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
