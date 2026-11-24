import { Routes } from '@angular/router';

export const TICKET_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/tickets').then((m) => m.Tickets),
  },
  {
    path: 'new',
    loadComponent: () => import('./new-ticket/new-ticket').then((m) => m.NewTicket),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('../ticket-detail/ticket-detail').then((m) => m.TicketDetail),
  }
];
