import { Routes } from '@angular/router';

export const TICKET_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/ticket-list-table/tickets').then((m) => m.Tickets),
  },
  {
    path: 'new',
    loadComponent: () => import('./new-ticket/new-ticket').then((m) => m.NewTicket),
  },
  {
    path: 'infinite',
    loadComponent: () => import('./pages/ticket-infinite/tickets-infinite').then((m) => m.TicketsInfinite),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('../ticket-detail/ticket-detail').then((m) => m.TicketDetail),
  }
];
