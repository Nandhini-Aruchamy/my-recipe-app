import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
//import { provideDatabase, getDatabase,AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { authInterceptor } from './auth/auth.interceptor';

import {
  AngularFireDatabase,
  AngularFireDatabaseModule,
} from '@angular/fire/compat/database';
import { PROVIDED_FIRESTORE_INSTANCES } from '@angular/fire/firestore/firestore.module';
import { provideClientHydration } from '@angular/platform-browser';

const firebaseConfig = {
  apiKey: 'AIzaSyDt7p_-4Hq0oaecxVrdwkzlg9gxKnCaXNs',
  authDomain: 'my-recipe-book-c9769.firebaseapp.com',
  databaseURL: 'https://my-recipe-book-c9769-default-rtdb.firebaseio.com',
  projectId: 'my-recipe-book-c9769',
  storageBucket: 'my-recipe-book-c9769.appspot.com',
  messagingSenderId: '264635272434',
  appId: '1:264635272434:web:d345a545850885ac91d46b',
  measurementId: 'G-RB00DMDLZ1',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),

    importProvidersFrom([
      provideFirebaseApp(() => initializeApp(firebaseConfig)),
      AngularFireDatabaseModule,
      // provideDatabase(() => getDatabase()),
      provideAuth(() => getAuth()),
    ]),
    provideClientHydration(),
  ],
};
