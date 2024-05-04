// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestType } from '../enums/request-type';

import {
  getDatabase,
  ref,
  onValue,
  child,
  push,
  update,
} from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class HttpRequestService {
  db = getDatabase();
  constructor() {}

  httpRequest<T, R>(
    requestType: RequestType,
    request?: T
  ): Observable<void | R[]> {
    if (requestType == RequestType.UPDATE) {
      const newPostKey = push(child(ref(this.db), 'recipes')).key;

      const updates = {
        ['/recipes/' + newPostKey]: request,
      };

      update(ref(this.db), updates);
      // return this.http
      //   .post(url + 'recipes.json', request)
      //   .pipe(
      //     catchError((error) =>
      //       throwError(() => 'Something went wrong with the POST request.')
      //     )
      //   );
    } else if (requestType == RequestType.GET) {
      return new Observable((observer) => {
        const starCountRef = ref(this.db, 'recipes');
        //To read data at a path and listen for changes, use the onValue property
        onValue(starCountRef, (snapshot) => {
          //The event has a snapshot property containing all data at that location, including child data. If there is no data, the snapshot's exists property will be false and its value property will be null.
          const data = snapshot.val();
          const dataArray = data ? (Object.values(data) as R[]) : [];
          observer.next(dataArray as R[]);
        });
      });
    } else if (requestType == RequestType.DELETE) {
      console.log(child(ref(this.db), 'recipes').key);
      //   let userRef = this.database.ref('users/' + userId);
      // userRef.remove()
    }
    return new Observable();
  }
}
