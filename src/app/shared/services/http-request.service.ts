import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { RequestType } from '../enums/request-type';

@Injectable({
  providedIn: 'root',
})
export class HttpRequestService {
  constructor(private http: HttpClient) {}

  httpRequest<T, R>(
    requestType: string,
    request?: T
  ): Observable<object | R[]> {
    const url = 'https://my-recipe-book-c9769-default-rtdb.firebaseio.com/';
    if (requestType == RequestType.POST) {
      return this.http
        .post(url + 'recipes.json', request)
        .pipe(
          catchError((error) =>
            throwError(() => 'Something went wrong with the POST request.')
          )
        );
    } else if (requestType == RequestType.GET) {
      return this.http.get(url + 'recipes.json').pipe(
        map((response: any) => Object.values(response)),
        catchError((error) =>
          throwError(() => 'Something went wrong with the GETS request.')
        )
      );
    }
    return new Observable();
  }
}
