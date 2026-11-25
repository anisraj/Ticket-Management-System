export interface DashboardSummary {
  total: number;
  open: number;
  inProgress: number;
  closed: number;
  blocked: number;
  overdue: number;
}

export type ActivityAction = 'CREATED' | 'STATUS_CHANGED' | 'ASSIGNED';

export interface ActivityItem {
  id: number;
  action: ActivityAction;
  details: string | null;
  ticketId: number;
  ticketTitle: string;
  actor: string;          // email of the user who did it
  createdAt: string;
}
