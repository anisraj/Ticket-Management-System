import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { API_URL } from '../config/api.config';
import { TokenStorage } from '../auth/token-storage';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const tokens = inject(TokenStorage);

  const isOurApi = req.url.startsWith(API_URL);
  const isAuthEndpoint = req.url.startsWith(`${API_URL}/auth/`);
  const token = tokens.getAccessToken();

  if (!isOurApi || isAuthEndpoint || !token) {
    return next(req);
  }

  const requestWithToken = req.clone({
    setHeaders: { Authorization: `Bearer ${token}` },
  });
  return next(requestWithToken);
};
