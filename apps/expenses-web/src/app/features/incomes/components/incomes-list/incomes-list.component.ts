import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { IncomesService } from '../../incomes.service';
import { SpinnerStore } from '../../../../shell/spinner/spinner.store';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { DataView } from 'primeng/dataview';
import { IncomesFilterComponent } from './incomes-filter/incomes-filter.component';
import { NgClass, AsyncPipe } from '@angular/common';
import { Menu } from 'primeng/menu';
import { Button } from 'primeng/button';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { FormatDatePipe } from '../../../../shared/pipes/format-date.pipe';
import { FormatCurrencyPipe } from '../../../../shared/pipes/format-currency.pipe';

@Component({
  selector: 'app-incomes-list',
  templateUrl: 'incomes-list.component.html',
  styleUrls: ['./incomes-list.component.scss'],
  imports: [
    DataView,
    IncomesFilterComponent,
    NgClass,
    Menu,
    Button,
    ConfirmDialog,
    AsyncPipe,
    FormatDatePipe,
    FormatCurrencyPipe,
  ],
})
export class IncomesListComponent implements OnInit, OnDestroy {
  #service = inject(IncomesService);
  #spinnerStore = inject(SpinnerStore);
  #confirmationService = inject(ConfirmationService);
  #translateService = inject(TranslateService);

  actionMenuItems$: BehaviorSubject<MenuItem[]> = new BehaviorSubject(
    [] as MenuItem[],
  );
  incomes$ = this.#service.incomes$;

  private destory$ = new Subject<void>();

  ngOnInit() {
    this.#service.loadStatus$
      .pipe(takeUntil(this.destory$))
      .subscribe((status) =>
        this.#spinnerStore.setState(status.status === 'pending'),
      );
    this.load();
  }

  ngOnDestroy(): void {
    this.destory$.next();
    this.destory$.complete();
  }

  // Workaround as described in https://github.com/primefaces/primeng/issues/13934#issuecomment-1887208083
  // due to issue still not resolved
  onMenuShow(expenseId: string) {
    this.actionMenuItems$.next([
      {
        label: this.#translateService.instant('actionMenu.items.edit'),
        icon: 'pi pi-pencil',
        command() {
          console.log('TODO EDIT');
        },
      },
      {
        label: this.#translateService.instant('actionMenu.items.delete'),
        icon: 'pi pi-trash',
        command: () => {
          this.#confirmationService.confirm({
            message: this.#translateService.instant('dialogs.delete.message', {
              item: 'this income',
            }),
            header: this.#translateService.instant('dialogs.delete.header'),
            icon: 'pi pi-info-circle',
            acceptButtonStyleClass: 'p-button-danger p-button-text',
            rejectButtonStyleClass: 'p-button-text p-button-text',
            acceptIcon: 'none',
            rejectIcon: 'none',

            accept: () => {
              this.#service.delete(expenseId);
            },
          });
        },
      },
    ]);
  }

  load() {
    this.#service.load();
  }
}
