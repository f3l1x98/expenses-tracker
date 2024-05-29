import { ActionReducer } from '@ngrx/store';
import { LocalStorageConfig, localStorageSync } from 'ngrx-store-localstorage';
import { AuthState } from './auth.state';

export function localStorageSyncReducer(
  reducer: ActionReducer<AuthState>
): ActionReducer<AuthState> {
  const config: LocalStorageConfig = {
    keys: ['status', 'token', 'user'],
    rehydrate: true,
    removeOnUndefined: true,
    storageKeySerializer: (key) => `auth_${key}`,
  };

  return localStorageSync(config)(reducer);
}
