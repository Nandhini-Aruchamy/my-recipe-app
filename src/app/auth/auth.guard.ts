import { CanActivateFn, Router } from '@angular/router';

import { inject } from '@angular/core';
import { AuthStore } from '../store/auth.store';

export const AuthGuard: CanActivateFn = () => {
  if (inject(AuthStore).userData() === undefined) {
    inject(Router).navigate(['/auth']);
    return false;
  }
  return true;
};
