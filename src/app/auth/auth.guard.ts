import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { Observable, map, pipe, switchMap, tap } from 'rxjs';
import { user } from '@angular/fire/auth';
import { databaseInstanceFactory } from '@angular/fire/database/database.module';
import { User } from './user.model';

export const authGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthService);
  //return authService.user.pipe();
  return true;
};
