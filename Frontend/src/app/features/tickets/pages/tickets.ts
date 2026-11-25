import { DatePipe } from '@angular/common';
import { Component, computed, effect, inject, untracked } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { catchError, of, switchMap } from 'rxjs';
import { StatusBadge } from '../../../shared/status-badge/status-badge';
import { PAGE_SIZES, SortField, TicketPageQuery } from '../model/ticket.model';
import { isCanonical, parseTicketQuery, sameQuery, toQueryParams } from '../model/ticket-query';
import { TicketService } from '../service/ticket-service';

@Component({
  selector: 'app-tickets',
  imports: [DatePipe, RouterLink, StatusBadge],
  templateUrl: './tickets.html',
})
export class Tickets {
  private readonly ticketService = inject(TicketService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  protected readonly pageSizes = PAGE_SIZES;

  // The URL is the only place where the table state is stored.
  private readonly params = toSignal(this.route.queryParamMap, {
    initialValue: this.route.snapshot.queryParamMap,
  });

  // `equal` says: if the values are the same, keep the old object.
  // Without it, every URL change would create a new object and send a new request.
  private readonly query = computed(() => parseTicketQuery(this.params()), { equal: sameQuery });

  protected readonly page = computed(() => this.query().page);
  protected readonly size = computed(() => this.query().size);
  protected readonly sort = computed(() => this.query().sort);

  private readonly result = toSignal(
    toObservable(this.query).pipe(
      switchMap((query) => this.ticketService.getPage(query).pipe(catchError(() => of(null)))),
    ),
  );

  protected readonly tickets = computed(() => this.result()?.content ?? []);
  protected readonly totalElements = computed(() => this.result()?.totalElements ?? 0);
  protected readonly totalPages = computed(() => Math.max(this.result()?.totalPages ?? 1, 1));
  protected readonly firstRow = computed(() =>
    this.tickets().length === 0 ? 0 : (this.page() - 1) * this.size() + 1,
  );
  protected readonly lastRow = computed(() =>
    this.tickets().length === 0 ? 0 : this.firstRow() + this.tickets().length - 1,
  );
  protected readonly hasPrevious = computed(() => this.page() > 1);
  protected readonly hasNext = computed(() => this.page() < this.totalPages());

  constructor() {
    // 1. If the URL has wrong or default values, replace it with the clean version.
    effect(() => {
      if (!isCanonical(this.params(), this.query())) {
        this.navigate(this.query(), true);
      }
    });

    // 2. If the page is after the last page (for example ?page=999), go to the last page.
    effect(() => {
      const result = this.result();
      if (!result) {
        return;
      }
      const lastPage = Math.max(result.totalPages, 1);
      if (result.page > lastPage) {
        untracked(() => this.navigate({ ...this.query(), page: lastPage }, true));
      }
    });
  }

  protected previous() {
    if (this.hasPrevious()) {
      this.navigate({ ...this.query(), page: this.page() - 1 });
    }
  }

  protected next() {
    if (this.hasNext()) {
      this.navigate({ ...this.query(), page: this.page() + 1 });
    }
  }

  protected changeSize(event: Event) {
    const size = Number((event.target as HTMLSelectElement).value);
    this.navigate({ ...this.query(), size, page: 1 });
  }

  protected sortBy(field: SortField) {
    const current = this.sort();
    const direction = current.field === field && current.direction === 'asc' ? 'desc' : 'asc';
    this.navigate({ ...this.query(), sort: { field, direction }, page: 1 });
  }

  protected ariaSort(field: SortField): 'ascending' | 'descending' | 'none' {
    const sort = this.sort();
    if (sort.field !== field) {
      return 'none';
    }
    return sort.direction === 'asc' ? 'ascending' : 'descending';
  }

  protected arrow(field: SortField): string {
    const sort = this.sort();
    if (sort.field !== field) {
      return '';
    }
    return sort.direction === 'asc' ? '▲' : '▼';
  }

  // The only place that changes the table state: it changes the URL.
  private navigate(query: TicketPageQuery, replaceUrl = false) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: toQueryParams(query),
      queryParamsHandling: 'merge',
      replaceUrl,
    });
  }
}
