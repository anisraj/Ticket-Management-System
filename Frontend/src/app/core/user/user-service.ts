import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../config/api.config';
import { skipLoading } from '../http/http-context-tokens';
import { UserProfile } from './user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly http = inject(HttpClient);

  getProfile(id: number): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${API_URL}/users/${id}`, {
      context: skipLoading(),
    });
  }
}
