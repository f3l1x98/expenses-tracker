import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
  untracked,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { form, required, FormField, submit } from '@angular/forms/signals';

import { AuthStore } from '../../auth.store';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FloatLabelModule } from 'primeng/floatlabel';
import { AppHeaderComponent } from '../../../../shared/components/app-header/app-header.component';
import { TranslateModule } from '@ngx-translate/core';
import { PrimeNgSignalStatus } from 'apps/expenses-web/src/app/shared/directives/primeng-signal-status';

interface LoginState {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    PasswordModule,
    AppHeaderComponent,
    FloatLabelModule,
    TranslateModule,
    FormField,
    PrimeNgSignalStatus,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  #store = inject(AuthStore);
  #router = inject(Router);
  #route = inject(ActivatedRoute);

  loginState = signal<LoginState>({
    username: '',
    password: '',
  });
  loginForm = form(this.loginState, (schemaPath) => {
    required(schemaPath.username); // TODO: Error msg
    required(schemaPath.password); // TODO: Error msg
  });

  // Proxy for PrimeNG inputs until they support Signal Forms
  passwordProxy = signal<string>('');

  loading = computed(() => this.#store.status().value === 'running');

  constructor() {
    effect(() => {
      const status = this.#store.status();
      if (status.value == 'success') {
        const returnUrl =
          this.#route.snapshot.queryParams['returnUrl'] || '/features';
        this.#router.navigate([returnUrl]);
        this.loginForm().reset();
      }
    });
    // Bridges for Proxy due to missing Signal Forms support of PrimeNG
    effect(() => {
      const input = untracked(() => this.loginForm.password());
      this.passwordProxy.set(input.value());
    });
    effect(() => {
      const input = untracked(() => this.loginForm.password());
      input.value.set(this.passwordProxy());
    });
  }

  submit() {
    submit(this.loginForm, async () => {
      this.#store.login({
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        username: this.loginForm.username().value(),
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        password: this.loginForm.password().value(),
      });
    });
  }
}
