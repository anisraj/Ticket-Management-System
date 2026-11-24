import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { API_URL } from '../config/api.config';
import { AuthService } from '../auth/auth-service';
import { ToastService } from '../toast/toast-service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const toast = inject(ToastService);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      const isAuthEndpoint = req.url.startsWith(`${API_URL}/auth/`);

      if (err.status === 401 && !isAuthEndpoint) {
        auth.sessionExpired();
      } else if (err.status === 0) {
        toast.error('Cannot reach the server. Check your connection.');
      } else if (err.status >= 500) {
        toast.error('Something went wrong on the server. Please try again.');
      }

      return throwError(() => err);
    }),
  );
};
