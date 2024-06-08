import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { IncomeCategory } from '../../api/interfaces/income-category';
import { Subject } from 'rxjs';
import { IncomesService } from '../../incomes.service';
import { RecurringIncomesService } from '../../recurring-incomes.service';
import { AuthService } from '../../../../core/auth/auth.service';

enum RecurringCycle {
  YEARLY = 'yearly',
  MONTHLY = 'monthly',
  WEEKLY = 'weekly',
}

@Component({
  selector: 'app-income-create',
  templateUrl: 'income-create.component.html',
})
export class IncomeCreateComponent implements OnInit, OnDestroy {
  formGroup!: FormGroup;
  categoryOptions = Object.values(IncomeCategory);
  recurringCycleOptions = Object.values(RecurringCycle);

  user$ = this.authService.currentUser$;

  private destory$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private incomesService: IncomesService,
    private recurringIncomesService: RecurringIncomesService,
    private authService: AuthService
  ) {}

  ngOnDestroy(): void {
    this.destory$.next();
    this.destory$.complete();
  }

  ngOnInit() {
    const now = new Date();
    this.formGroup = this.formBuilder.group({
      description: new FormControl('', [Validators.required]),
      category: new FormControl<IncomeCategory>(IncomeCategory.SALARY, [
        Validators.required,
      ]),
      recurringIncome: new FormControl<boolean>(false, [Validators.required]),
      amount: new FormControl(0, [Validators.required, Validators.min(0)]),
      recurringCycle: new FormControl<RecurringCycle>(RecurringCycle.MONTHLY, [
        Validators.required,
      ]),
      startDate: new FormControl<Date>(now, [
        Validators.required,
        this.validateDateAfter({ value: now }),
      ]),
      endDate: new FormControl<Date | undefined>(undefined, [
        this.validateDateAfter({ formControlName: 'startDate' }),
      ]),
    });
  }

  private validateDateAfter(options: ValidateDateAfterOptions): ValidatorFn {
    return (
      control: AbstractControl<Date | undefined>
    ): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;
      let beforeValue: Date;
      if (options.value !== undefined) {
        beforeValue = options.value;
      } else {
        beforeValue = this.formGroup.controls[options.formControlName!].value;
        if (!(beforeValue instanceof Date)) {
          console.error(
            `The control of ${options.formControlName} is not a valid date.`
          );
          return null;
        }
      }

      const isAfter = value.getTime() >= beforeValue.getTime();

      return isAfter ? null : { isAfter: false };
    };
  }

  submit() {
    if (!this.formGroup.valid) return;

    const isRecurringCreation: boolean =
      this.formGroup.get('recurringIncome')!.value;
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
        cron: this.constructCron(recurringCycle, startDate),
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
    // TODO this also clears the radioBtns
    this.formGroup.reset();
  }

  private constructCron(cycle: RecurringCycle, startDate: Date): string {
    let dayOfWeek: string = '*';
    let month: string = '*';
    let dayOfMonth: string = '*';
    let hour: string = '2';
    let minute: string = '0';
    switch (cycle) {
      case RecurringCycle.YEARLY:
        month = `${startDate.getMonth()}`;
        dayOfMonth = `${startDate.getDay()}`;
        break;
      case RecurringCycle.MONTHLY:
        // TODO no support for 'last day of month' -> 31. -> skip all months without a 31st
        dayOfMonth = `${startDate.getDate()}`;
        break;
      case RecurringCycle.WEEKLY:
        dayOfWeek = `${startDate.getDay()}`;
        break;
    }
    return `${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`;
  }
}

type ValidateDateAfterOptions =
  | ValidateDateAfterWithValue
  | ValidateDateAfterWithFormControl;

interface ValidateDateAfterWithValue {
  value: Date;
  formControlName?: string;
}

interface ValidateDateAfterWithFormControl {
  value?: Date;
  formControlName: string;
}
