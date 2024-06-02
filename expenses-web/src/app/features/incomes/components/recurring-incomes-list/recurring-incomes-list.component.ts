import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { SpinnerService } from '../../../../shell/spinner/spinner.service';
import { RecurringIncomesService } from '../../recurring-incomes.service';

@Component({
  selector: 'app-recurring-incomes-list',
  templateUrl: 'recurring-incomes-list.component.html',
})
export class RecurringIncomesListComponent implements OnInit {
  recurringIncomes$ = this.service.recurringIncomes$;

  private destory$ = new Subject<void>();

  constructor(
    private service: RecurringIncomesService,
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
