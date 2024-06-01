import { Component, OnInit } from '@angular/core';
import { ExpensesService } from '../../expenses.service';
import { Subject, takeUntil } from 'rxjs';
import { SpinnerService } from '../../../../shell/spinner/spinner.service';

@Component({
  selector: 'app-recurring-expenses-list',
  templateUrl: 'recurring-expenses-list.component.html',
})
export class RecurringExpensesListComponent implements OnInit {
  expenses$ = this.service.expenses$;

  private destory$ = new Subject<void>();

  constructor(
    // TODO replace with service for recurring expenses
    private service: ExpensesService,
    private spinnerService: SpinnerService
  ) {}

  ngOnInit() {
    this.service.status$
      .pipe(takeUntil(this.destory$))
      .subscribe((status) =>
        this.spinnerService.setState({ active: status.status === 'pending' })
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
