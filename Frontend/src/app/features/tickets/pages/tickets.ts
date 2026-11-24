import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StatusBadge } from '../../../shared/status-badge/status-badge';
import { TicketService } from '../service/ticket-service';
import { Ticket } from '../model/ticket.model';


@Component({
  selector: 'app-tickets',
  imports: [RouterLink, StatusBadge],
  templateUrl: './tickets.html',
})
export class Tickets implements OnInit {
  private readonly ticketService = inject(TicketService);

  protected readonly tickets = signal<Ticket[]>([]);

  ngOnInit() {
    this.ticketService.getAll().subscribe((list) => this.tickets.set(list));
  }
}
