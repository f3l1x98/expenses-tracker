import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

export type SpinnerState = {
  active: boolean;
  label?: string;
};

const initialState: SpinnerState = {
  active: false,
};

export const SpinnerStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    setState(active: boolean, label?: string) {
      patchState(store, { active, label });
    },
  })),
);
