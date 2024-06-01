import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { SpinnerService } from '../../../../shell/spinner/spinner.service';
import { ExpensesService } from '../../expenses.service';

@Component({
  selector: 'app-expenses-list',
  templateUrl: 'expenses-list.component.html',
})
export class ExpensesListComponent implements OnInit, OnDestroy {
  expenses$ = this.service.expenses$;

  private destory$ = new Subject<void>();

  constructor(
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
