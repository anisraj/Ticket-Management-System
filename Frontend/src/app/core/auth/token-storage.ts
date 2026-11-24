import { Injectable } from '@angular/core';

const TOKEN_KEY = 'access_token';
const USER_KEY = 'user';

export interface StoredUser {
  email: string;
  role: string;
}

@Injectable({ providedIn: 'root' })
export class TokenStorage {
  getAccessToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  setAccessToken(token: string) {
    sessionStorage.setItem(TOKEN_KEY, token);
  }

  getUser(): StoredUser | null {
    const text = sessionStorage.getItem(USER_KEY);
    if (!text) {
      return null;
    }
    try {
      return JSON.parse(text) as StoredUser;
    } catch {
      return null;
    }
  }

  setUser(user: StoredUser) {
    sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  clear() {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);
  }
}
