import { TicketStatus } from '../../../shared/status-badge/status-badge';

export interface Ticket {
  id: number;
  title: string;
  status: TicketStatus;
  description: string;
  type?: TicketType;
  priority?: TicketPriority;
  dueDate?: string | null;
  escalationDate?: string | null;
  stepsToReproduce?: string | null;
  managerEmail?: string | null;
  justification?: string | null;
  watchers?: string[];
  createdBy?: string;
  createdAt?: string;
  assigneeId?: number | null;
}

export interface CreateTicketRequest {
  title: string;
  type: TicketType;
  priority: TicketPriority;
  description: string;
  dueDate: string | null;
  escalationDate: string | null;
  stepsToReproduce: string | null;
  managerEmail: string | null;
  justification: string | null;
  watchers: string[];
}

export const TICKET_TYPES = ['BUG', 'FEATURE', 'ACCESS_REQUEST'] as const;
export type TicketType = (typeof TICKET_TYPES)[number];

export const TICKET_PRIORITIES = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'] as const;
export type TicketPriority = (typeof TICKET_PRIORITIES)[number];


export interface TicketListItem {
  id: number;
  title: string;
  status: TicketStatus;
  type: TicketType;
  priority: TicketPriority;
  dueDate: string | null;
  createdBy: string;
  createdAt: string;
}

export const SORT_FIELDS = ['title', 'createdAt'] as const;
export type SortField = (typeof SORT_FIELDS)[number];
export type SortDirection = 'asc' | 'desc';

export interface TicketSort {
  field: SortField;
  direction: SortDirection;
}

export interface TicketPageQuery {
  page: number;
  size: number;
  sort: TicketSort;
}

export const PAGE_SIZES = [5, 10, 20, 50] as const;
