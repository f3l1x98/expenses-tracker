import { CommonModule } from '@angular/common';
import {
  Component,
  HostListener,
  effect,
  inject,
  signal,
  untracked,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { StepperModule } from 'primeng/stepper';
import { PasswordModule } from 'primeng/password';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Observable, Subject } from 'rxjs';
import { RouterLinkWithHref } from '@angular/router';
import { ComponentCanDeactivate } from '../../../../shared/guards/pending-changes.guard';
import { ConfirmationService } from 'primeng/api';
import { PendingChangesDialogComponent } from '../../../../shared/components/pending-changes-dialog/pending-changes-dialog.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CurrencyInputComponent } from '../../../../shared/components/currency-input/currency-input.component';
import { UserStore } from '../../user.store';
import { FieldState, form, FormField, submit } from '@angular/forms/signals';
import {
  buildCredentialsValidation,
  buildSettingsValidation,
  createCredentialsForm,
  createSettingsForm,
  RegistrationFormState,
} from './register.model';
import { PrimeNgSignalStatus } from 'apps/expenses-web/src/app/shared/directives/primeng-signal-status';

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
  imports: [
    CommonModule,
    RouterLinkWithHref,
    CardModule,
    StepperModule,
    FormsModule,
    PasswordModule,
    FloatLabelModule,
    InputTextModule,
    ButtonModule,
    PendingChangesDialogComponent,
    TranslateModule,
    CurrencyInputComponent,
    FormField,
    PrimeNgSignalStatus,
  ],
  providers: [ConfirmationService],
})
export class RegisterComponent implements ComponentCanDeactivate {
  #store = inject(UserStore);
  #confirmationService = inject(ConfirmationService);
  #translateService = inject(TranslateService);

  registerStatus = this.#store.createStatus;

  registrationState = signal<RegistrationFormState>({
    credentials: createCredentialsForm()(),
    settings: createSettingsForm()(),
  });
  registrationForm = form(this.registrationState, (schemaPath) => {
    buildCredentialsValidation(schemaPath.credentials);
    buildSettingsValidation(schemaPath.settings);
  });

  // Proxies for PrimeNG inputs until they support Signal Forms
  passwordProxy = signal<string>('');
  confirmPasswordProxy = signal<string>('');

  constructor() {
    effect(() => {
      const createStatus = this.#store.createStatus();

      if (createStatus.status == 'success') {
        this.registrationForm().reset();
        this.registrationForm().reset();
      }
    });
    // Bridges for Proxies due to missing Signal Forms support of PrimeNG
    effect(() => {
      const input = untracked(() =>
        this.registrationForm.credentials.password(),
      );
      this.passwordProxy.set(input.value());
    });
    effect(() => {
      const input = untracked(() =>
        this.registrationForm.credentials.password(),
      );
      input.value.set(this.passwordProxy());
    });
    effect(() => {
      const input = untracked(() =>
        this.registrationForm.credentials.confirmPassword(),
      );
      this.confirmPasswordProxy.set(input.value());
    });
    effect(() => {
      const input = untracked(() =>
        this.registrationForm.credentials.confirmPassword(),
      );
      input.value.set(this.confirmPasswordProxy());
    });
  }

  @HostListener('window:beforeunload')
  canDeactivate(): boolean | Observable<boolean> {
    if (!this.registrationForm().dirty()) {
      return true;
    }
    const canDeactiveSubject$ = new Subject<boolean>();
    this.#confirmationService.confirm({
      message: this.#translateService.instant('dialogs.unsafedData.message'),
      header: this.#translateService.instant('dialogs.unsafedData.header'),
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        canDeactiveSubject$.next(true);
      },
      reject: () => {
        canDeactiveSubject$.next(false);
      },
    });
    return canDeactiveSubject$;
  }

  register() {
    submit(this.registrationForm, async () => {
      const currency = this.registrationForm.settings.currency().value();
      this.#store.createUser({
        password: this.registrationForm.credentials.password().value(),
        username: this.registrationForm.credentials.username().value(),
        settings: {
          currency: currency?.code ?? '',
        },
      });
    });
  }

  isInvalid(field: FieldState<unknown, string | number>): boolean {
    return field.dirty() && field.invalid();
  }
}
