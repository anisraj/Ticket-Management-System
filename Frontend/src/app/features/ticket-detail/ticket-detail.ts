import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, catchError, map, of, switchMap } from 'rxjs';
import { UserProfile } from '../../core/user/user.model';
import { UserService } from '../../core/user/user-service';
import { LoadState, toLoadState } from '../../shared/model/load-state';
import { StatusBadge } from '../../shared/status-badge/status-badge';
import { Ticket } from '../tickets/model/ticket.model';
import { TicketService } from '../tickets/service/ticket-service';

// What the screen needs: the ticket + the state of the assignee box
interface TicketView {
  ticket: Ticket;
  assignee: LoadState<UserProfile>;
}

@Component({
  selector: 'app-ticket-detail',
  imports: [RouterLink, StatusBadge],
  templateUrl: './ticket-detail.html',
})
export class TicketDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly ticketService = inject(TicketService);
  private readonly userService = inject(UserService);

  // undefined = loading, null = ticket not found, object = found
  protected readonly view = toSignal(
    this.route.paramMap.pipe(
      map((params) => Number(params.get('id'))),
      switchMap((id) =>
        this.ticketService.getOne(id).pipe(
          switchMap((ticket) => this.withAssignee(ticket)),
          catchError(() => of(null)),
        ),
      ),
    ),
    { initialValue: undefined },
  );

  private withAssignee(ticket: Ticket): Observable<TicketView> {
    if (ticket.assigneeId == null) {
      return of({ ticket, assignee: { status: 'empty' } });
    }
    return this.userService.getProfile(ticket.assigneeId).pipe(
      toLoadState(),
      map((assignee) => ({ ticket, assignee })),
    );
  }
}
