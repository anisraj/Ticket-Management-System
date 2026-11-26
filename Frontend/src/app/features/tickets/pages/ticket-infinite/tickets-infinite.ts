import {
  CdkFixedSizeVirtualScroll,
  CdkVirtualForOf,
  CdkVirtualScrollViewport,
} from '@angular/cdk/scrolling';
import { DatePipe } from '@angular/common';
import { Component, DestroyRef, computed, inject, signal, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import {TicketListItem, TicketSort} from '../../model/ticket.model';
import {StatusBadge} from '../../../../shared/status-badge/status-badge';
import {InView} from '../../../../shared/directives/in-view';
import {TicketService} from '../../service/ticket-service';
import {errorMessage} from '../../../../shared/model/load-state';

const PAGE_SIZE = 20;
const SORT: TicketSort = { field: 'createdAt', direction: 'desc' };

// Everything in the list is a "row": a ticket, or one of three helper rows.
type Row =
  | { kind: 'ticket'; key: string; ticket: TicketListItem }
  | { kind: 'sentinel'; key: string }
  | { kind: 'loading'; key: string }
  | { kind: 'error'; key: string; message: string };

@Component({
  selector: 'app-tickets-infinite',
  imports: [
    CdkVirtualScrollViewport,
    CdkFixedSizeVirtualScroll,
    CdkVirtualForOf,
    InView,
    DatePipe,
    RouterLink,
    StatusBadge,
  ],
  templateUrl: './tickets-infinite.html',
})
export class TicketsInfinite {
  private readonly ticketService = inject(TicketService);
  private readonly destroyRef = inject(DestroyRef);

  // The scroll container. In-view checks use it as the "root".
  private readonly viewport = viewChild(CdkVirtualScrollViewport);
  protected readonly viewportEl = computed(
    () => this.viewport()?.elementRef.nativeElement ?? null,
  );

  // ---- state ----
  protected readonly tickets = signal<TicketListItem[]>([]);
  protected readonly totalElements = signal(0);
  private readonly nextPage = signal(1);
  private readonly hasMore = signal(true);
  protected readonly isLoading = signal(false);
  private readonly error = signal<string | null>(null);

  // ---- what the list shows ----
  protected readonly rows = computed<Row[]>(() => {
    const rows: Row[] = this.tickets().map((ticket) => ({
      kind: 'ticket',
      key: `t-${ticket.id}`,
      ticket,
    }));

    if (this.isLoading()) {
      rows.push({ kind: 'loading', key: 'loading' });
    } else if (this.error()) {
      rows.push({ kind: 'error', key: 'error', message: this.error()! });
    } else if (this.hasMore()) {
      rows.push({ kind: 'sentinel', key: 'sentinel' });
    }
    return rows;
  });

  protected readonly isEmpty = computed(
    () => !this.isLoading() && !this.error() && !this.hasMore() && this.tickets().length === 0,
  );

  constructor() {
    this.loadMore(); // first page
  }

  // Called by the first load, by the sentinel, and by "Try again".
  protected loadMore() {
    if (this.isLoading() || !this.hasMore()) {
      return; // guard: never run two requests at the same time
    }

    this.isLoading.set(true);
    this.error.set(null);

    this.ticketService
      .getPage({ page: this.nextPage(), size: PAGE_SIZE, sort: SORT })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          // Immutable append: a NEW array, the old one is not touched.
          this.tickets.update((list) => [...list, ...response.content]);
          this.totalElements.set(response.totalElements);
          this.nextPage.set(response.page + 1);
          this.hasMore.set(response.page < response.totalPages);
          this.isLoading.set(false);
        },
        error: (err: unknown) => {
          this.error.set(errorMessage(err));
          this.isLoading.set(false);
        },
      });
  }

  protected trackRow(_index: number, row: Row): string {
    return row.key;
  }
}
