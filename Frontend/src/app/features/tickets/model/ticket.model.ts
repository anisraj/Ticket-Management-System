import { TicketStatus } from '../../../shared/status-badge/status-badge';

export interface Ticket {
  id: number;
  title: string;
  status: TicketStatus;
  description: string;
}

export const TICKET_TYPES = ['BUG', 'FEATURE', 'ACCESS_REQUEST'] as const;
export type TicketType = (typeof TICKET_TYPES)[number];

export const TICKET_PRIORITIES = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'] as const;
export type TicketPriority = (typeof TICKET_PRIORITIES)[number];
