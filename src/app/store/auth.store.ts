import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { UserCredential } from 'firebase/auth';

type AuthState = {
  userData: UserCredential | undefined;
};

const initialState: AuthState = {
  userData: undefined,
};

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    storeUserDate(userData: UserCredential) {
      patchState(store, { userData: userData });
    },
    clearUserDate() {
      patchState(store, { userData: undefined });
    },
  }))
);
