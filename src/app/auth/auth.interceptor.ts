import { HttpInterceptorFn, HttpParams } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { map, tap, take, exhaustMap, BehaviorSubject } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let authService = inject(AuthService);
  let token = null;
  return next(req);

  // return authService.user.pipe(
  //   take(1),
  //   exhaustMap((user) => {
  //     token = user?.uid;
  //     console.log(token);
  //     if (token) {
  //       const modifiedReq = req.clone({
  //         params: new HttpParams().set('auth', token),
  //       });
  //       return next(modifiedReq);
  //     }
  //     return next(req);
  //   })
  // );
};
// .pipe(
//   map(() => {
//     authService.user.subscribe((user) => {
//       token = user?.uid;
//       if (token) {
//         const modifiedReq = req.clone({
//           params: new HttpParams().set('auth', token),
//         });
//       }
//     });
//   })
// );
