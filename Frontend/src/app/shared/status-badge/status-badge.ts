import { Component, computed, input } from '@angular/core';

export type TicketStatus = 'Open' | 'InProgress' | 'Closed' | 'Blocked';

const STATUS_CLASSES: Record<TicketStatus, string> = {
  Open: 'border-green-900 bg-green-600 text-white',
  InProgress: 'border-blue-900 bg-blue-600 text-white',
  Closed: 'border-gray-800 bg-gray-500 text-white',
  Blocked: 'border-red-900 bg-red-600 text-white',
};


@Component({
  imports: [],
  selector: 'app-status-badge',
  styleUrl: './status-badge.css',
  templateUrl: './status-badge.html',
})
export class StatusBadge {
  readonly status = input.required<TicketStatus>();

  protected readonly classes = computed(() => STATUS_CLASSES[this.status()]);
}
