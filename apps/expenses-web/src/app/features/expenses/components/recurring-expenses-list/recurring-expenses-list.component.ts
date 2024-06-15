import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { SpinnerService } from '../../../../shell/spinner/spinner.service';
import { RecurringExpensesService } from '../../recurring-expenses.service';

@Component({
  selector: 'app-recurring-expenses-list',
  templateUrl: 'recurring-expenses-list.component.html',
})
export class RecurringExpensesListComponent implements OnInit, OnDestroy {
  recurringExpenses$ = this.service.recurringExpenses$;

  private destory$ = new Subject<void>();

  constructor(
    private service: RecurringExpensesService,
    private spinnerService: SpinnerService,
  ) {}

  ngOnInit() {
    this.service.loadStatus$
      .pipe(takeUntil(this.destory$))
      .subscribe((status) =>
        this.spinnerService.setState({ active: status.status === 'pending' }),
      );
    this.load();
  }

  ngOnDestroy(): void {
    this.destory$.next();
    this.destory$.complete();
  }

  load() {
    this.service.load();
  }
}
