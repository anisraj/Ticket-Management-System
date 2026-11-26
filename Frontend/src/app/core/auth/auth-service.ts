import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { API_URL } from '../config/api.config';
import { skipLoading } from '../http/http-context-tokens';
import { ToastService } from '../toast/toast-service';
import { StoredUser, TokenStorage } from './token-storage';

export type Role = 'ADMIN' | 'USER';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  user: { email: string; role: Role; name: string | null; pictureUrl: string | null };
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly tokens = inject(TokenStorage);
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);

  // At startup we only read sessionStorage. No HTTP call.
  private readonly _isLoggedIn = signal(this.tokens.getAccessToken() !== null);
  private readonly _role = signal<Role | null>(this.readSavedRole());
  private readonly _user = signal<StoredUser | null>(this.tokens.getUser());

  readonly isLoggedIn = this._isLoggedIn.asReadonly();
  readonly role = this._role.asReadonly();
  readonly user = this._user.asReadonly();

  login(body: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${API_URL}/auth/login`, body, { withCredentials: true })
      .pipe(tap((res) => this.setSession(res)));
  }

  // The refresh token is in the cookie. We cannot read it, the browser sends it.
  refresh(): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(
        `${API_URL}/auth/refresh`,
        {},
        { withCredentials: true, context: skipLoading() },
      )
      .pipe(tap((res) => this.setSession(res)));
  }

  logout() {
    this.http
      .post(`${API_URL}/auth/logout`, {}, { withCredentials: true, context: skipLoading() })
      .subscribe({ error: () => {} });
    this.clearSession();
  }

  // Ends the session once: log out, go to login, show one toast.
  sessionExpired() {
    if (!this.isLoggedIn()) {
      return; // already handled by another request
    }
    const returnUrl = this.router.url;
    this.logout();
    this.router.navigate(['/login'], { queryParams: { returnUrl } });
    this.toast.error('Your session has expired. Please log in again.');
  }

  private setSession(res: LoginResponse) {
    this.tokens.setAccessToken(res.accessToken);
    this.tokens.setUser(res.user);
    this._role.set(res.user.role);
    this._isLoggedIn.set(true);
    this._user.set(res.user);
  }

  private clearSession() {
    this.tokens.clear();
    this._role.set(null);
    this._isLoggedIn.set(false);
    this._user.set(null);
  }

  private readSavedRole(): Role | null {
    const role = this.tokens.getUser()?.role;
    return role === 'ADMIN' || role === 'USER' ? role : null;
  }

  googleLogin(idToken: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${API_URL}/auth/google`, { idToken }, { withCredentials: true })
      .pipe(tap((res) => this.setSession(res)));
  }
}
