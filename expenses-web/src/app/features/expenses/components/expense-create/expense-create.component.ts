import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ExpenseCategory } from '../../api/interfaces/expense-category';
import { AuthService } from '../../../../core/auth/auth.service';
import { Subject } from 'rxjs';
import { ExpensesService } from '../../expenses.service';
import { RecurringExpensesService } from '../../recurring-expenses.service';
import { RecurringCycle } from '../../../../shared/interfaces/recurring-cycle.enum';
import { constructCron } from '../../../../shared/utils/cron-utils';
import { validateDateAfter } from '../../../../shared/validators/validate-date-after';

@Component({
  selector: 'app-expense-create',
  templateUrl: 'expense-create.component.html',
})
export class ExpenseCreateComponent implements OnInit, OnDestroy {
  formGroup!: FormGroup;
  categoryOptions = Object.values(ExpenseCategory);
  recurringCycleOptions = Object.values(RecurringCycle);

  user$ = this.authService.currentUser$;

  private destory$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private expensesService: ExpensesService,
    private recurringExpensesService: RecurringExpensesService,
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
      category: new FormControl<ExpenseCategory>(ExpenseCategory.MISC, [
        Validators.required,
      ]),
      recurringExpense: new FormControl<boolean>(false, [Validators.required]),
      amount: new FormControl(0, [Validators.required, Validators.min(0)]),
      recurringCycle: new FormControl<RecurringCycle>(RecurringCycle.MONTHLY, [
        Validators.required,
      ]),
      startDate: new FormControl<Date>(now, [
        Validators.required,
        validateDateAfter({ value: now }),
      ]),
      endDate: new FormControl<Date | undefined>(undefined, [
        validateDateAfter({ formControlName: 'startDate' }),
      ]),
    });
  }

  submit() {
    if (!this.formGroup.valid) return;

    const isRecurringCreation: boolean =
      this.formGroup.get('recurringExpense')!.value;
    const description = this.formGroup.get('description')?.value as string;
    const amount = this.formGroup.get('amount')?.value as number;
    const category = this.formGroup.get('category')?.value as ExpenseCategory;
    if (isRecurringCreation) {
      const recurringCycle = this.formGroup.get('recurringCycle')
        ?.value as RecurringCycle;
      const startDate = this.formGroup.get('startDate')?.value as Date;
      const endDate = this.formGroup.get('endDate')?.value as Date | undefined;
      this.recurringExpensesService.create({
        description: description,
        category: category,
        amount: amount,
        cron: constructCron(recurringCycle, startDate),
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
    // TODO this also clears the radioBtns
    this.formGroup.reset();
  }
}
