import { Injectable, inject } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  user,
} from '@angular/fire/auth';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  fireBaseAuth = inject(Auth);
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
      //new User(data.user.email,data.user.uid,data.user.to)
    });
    return from(promise); //convert promise to subscription
  }

  signOut(): Observable<void> {
    const promise = signOut(this.fireBaseAuth);
    return from(promise);
  }
}
