import { Signal, signal } from '@angular/core';
import { required, SchemaPathTree, validate } from '@angular/forms/signals';
import { Currency } from 'apps/expenses-web/src/app/shared/components/currency-input/currencys';

export interface RegistrationFormState {
  credentials: CredentialsFormState;
  settings: SettingsFormState;
}
export interface CredentialsFormState {
  username: string;
  password: string;
  confirmPassword: string;
}
export interface SettingsFormState {
  currency: Currency | null;
}

export function createCredentialsForm(): Signal<CredentialsFormState> {
  return signal<CredentialsFormState>({
    username: '',
    password: '',
    confirmPassword: '',
  });
}
export function buildCredentialsValidation(
  schema: SchemaPathTree<CredentialsFormState>,
) {
  required(schema.username);
  required(schema.password);
  required(schema.confirmPassword);
  validate(schema.confirmPassword, ({ value, valueOf }) => {
    const confirmPassword = value();
    const password = valueOf(schema.password);

    if (password !== confirmPassword) {
      return {
        kind: 'passwordMismatch',
        message: 'Passwords do not match',
      };
    }

    return null;
  });
}

export function createSettingsForm(): Signal<SettingsFormState> {
  return signal<SettingsFormState>({
    currency: null,
  });
}
export function buildSettingsValidation(
  schema: SchemaPathTree<SettingsFormState>,
) {
  required(schema.currency);
}
