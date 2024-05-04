import { Injectable, inject } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  user,
} from '@angular/fire/auth';
import { Observable, from } from 'rxjs';
import { AuthStore } from '../store/auth.store';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  fireBaseAuth = inject(Auth);
  authStore = inject(AuthStore);
  user = user(this.fireBaseAuth);

  register(email: string, password: string): Observable<any> {
    const promise = createUserWithEmailAndPassword(
      this.fireBaseAuth,
      email,
      password
    );
    return from(promise);
  }

  login(email: string, password: string): Observable<any> {
    const promise = signInWithEmailAndPassword(
      this.fireBaseAuth,
      email,
      password
    ).then((data) => {
      this.authStore.storeUserDate(data);
    });
    return from(promise); //convert promise to subscription
  }

  signOut(): Observable<void> {
    const promise = signOut(this.fireBaseAuth);
    return from(promise);
  }
}
