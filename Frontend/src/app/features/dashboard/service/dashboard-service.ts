import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../../../core/config/api.config';
import { skipLoading } from '../../../core/http/http-context-tokens';
import { ActivityItem, DashboardSummary } from '../model/dashboard.model';

// skipLoading: each widget shows its own loading state, so the global spinner stays off
@Injectable({ providedIn: 'root' })
export class DashboardService {
  private readonly http = inject(HttpClient);

  getSummary(): Observable<DashboardSummary> {
    return this.http.get<DashboardSummary>(`${API_URL}/admin/dashboard/summary`, {
      context: skipLoading(),
    });
  }

  getActivity(limit: number): Observable<ActivityItem[]> {
    return this.http.get<ActivityItem[]>(`${API_URL}/admin/dashboard/activity`, {
      params: { limit },
      context: skipLoading(),
    });
  }
}
