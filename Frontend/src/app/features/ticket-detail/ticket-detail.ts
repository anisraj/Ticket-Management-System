import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { catchError, map, of, switchMap } from 'rxjs';
import { StatusBadge } from '../../shared/status-badge/status-badge';
import { TicketService } from '../tickets/service/ticket-service';

@Component({
  selector: 'app-ticket-detail',
  imports: [RouterLink, StatusBadge],
  templateUrl: './ticket-detail.html',
})
export class TicketDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly ticketService = inject(TicketService);

  // undefined = still loading, null = not found, object = found
  protected readonly ticket = toSignal(
    this.route.paramMap.pipe(
      map((params) => Number(params.get('id'))),
      switchMap((id) => this.ticketService.getOne(id).pipe(catchError(() => of(null)))),
    ),
    { initialValue: undefined },
  );
}
