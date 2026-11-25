import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../../../core/config/api.config';
import {CreateTicketRequest, Ticket, TicketListItem, TicketPageQuery} from '../model/ticket.model';
import { skipLoading } from '../../../core/http/http-context-tokens';
import {PageResponse} from '../../../shared/model/page-response.model';

@Injectable({ providedIn: 'root' })
export class TicketService {
  private readonly http = inject(HttpClient);

  getPage(query: TicketPageQuery): Observable<PageResponse<TicketListItem>> {
    return this.http.get<PageResponse<TicketListItem>>(`${API_URL}/tickets`, {
      params: {
        page: query.page,
        size: query.size,
        sort: `${query.sort.field},${query.sort.direction}`,
      },
      context: skipLoading(),
    });
  }

  getOne(id: number): Observable<Ticket> {
    return this.http.get<Ticket>(`${API_URL}/tickets/${id}`);
  }

  titleExists(title: string): Observable<boolean> {
    return this.http.get<boolean>(`${API_URL}/tickets/title-exists`, {
      params: { title },
      context: skipLoading(),
    });
  }

  create(body: CreateTicketRequest): Observable<Ticket> {
    return this.http.post<Ticket>(`${API_URL}/tickets`, body);
  }
}
