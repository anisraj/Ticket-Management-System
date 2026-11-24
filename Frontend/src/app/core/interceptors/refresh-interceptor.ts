import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, catchError, finalize, shareReplay, switchMap, throwError } from 'rxjs';
import { API_URL } from '../config/api.config';
import { AuthService, LoginResponse } from '../auth/auth-service';

// The one refresh that is running right now, or null if none.
let refresh$: Observable<LoginResponse> | null = null;

export const refreshInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      const isAuthEndpoint = req.url.startsWith(`${API_URL}/auth/`);

      // Only a 401 on a normal request, when we have a refresh token, is our job.
      if (err.status !== 401 || isAuthEndpoint || !auth.isLoggedIn()) {
        return throwError(() => err);
      }

      // The first 401 creates the refresh. The others reuse it.
      if (!refresh$) {
        refresh$ = auth.refresh().pipe(
          catchError((refreshError) => {
            auth.sessionExpired();
            return throwError(() => refreshError);
          }),
          finalize(() => (refresh$ = null)),
          shareReplay(1),
        );
      }

      // Wait for the refresh, then send the original request again.
      return refresh$.pipe(switchMap(() => next(req)));
    }),
  );
};
