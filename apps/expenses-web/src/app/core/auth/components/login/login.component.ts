import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CommonModule } from '@angular/common';
import { AuthStore } from '../../auth.store';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FloatLabelModule } from 'primeng/floatlabel';
import { AppHeaderComponent } from '../../../../shared/components/app-header/app-header.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    PasswordModule,
    AppHeaderComponent,
    FloatLabelModule,
    TranslateModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  #store = inject(AuthStore);
  #router = inject(Router);
  #route = inject(ActivatedRoute);

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  loading = computed(() => this.#store.status().value === 'running');

  constructor() {
    effect(() => {
      const status = this.#store.status();
      if (status.value == 'success') {
        const returnUrl =
          this.#route.snapshot.queryParams['returnUrl'] || '/features';
        this.#router.navigate([returnUrl]);
        this.loginForm.reset();
      }
    });
  }

  submit() {
    if (!this.loginForm.valid) return;

    this.#store.login({
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      username: this.loginForm.get('username')!.value,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      password: this.loginForm.get('password')!.value,
    });
  }
}
