import { DatePipe } from '@angular/common';
import { Component, computed, effect, inject, linkedSignal, signal, untracked } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { StatusBadge } from '../../../shared/status-badge/status-badge';
import { PAGE_SIZES, SortField, TicketListItem, TicketPageQuery } from '../model/ticket.model';
import { isCanonical, parseTicketQuery, sameQuery, toQueryParams } from '../model/ticket-query';
import { TicketService } from '../service/ticket-service';
import {LoadState, toLoadState} from '../../../shared/model/load-state';
import {PageResponse} from '../../../shared/model/page-response.model';

type TicketTableState = LoadState<PageResponse<TicketListItem>>;

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
  protected readonly skeletonRows = [1, 2, 3, 4, 5];

  // The URL is the only place where the table state is stored.
  private readonly params = toSignal(this.route.queryParamMap, {
    initialValue: this.route.snapshot.queryParamMap,
  });

  private readonly query = computed(() => parseTicketQuery(this.params()), { equal: sameQuery });

  protected readonly page = computed(() => this.query().page);
  protected readonly size = computed(() => this.query().size);
  protected readonly sort = computed(() => this.query().sort);

  // Changing this number sends the same request again (the Try again button).
  private readonly attempt = signal(0);
  private readonly request = computed(() => ({ query: this.query(), attempt: this.attempt() }));

  // What the table is doing now: loading, error, empty or success.
  // Every new request first gives "loading", then one of the other three.
  protected readonly state = toSignal(
    toObservable(this.request).pipe(
      switchMap(({ query }) =>
        this.ticketService.getPage(query).pipe(toLoadState((page) => page.totalElements === 0)),
      ),
    ),
    { initialValue: { status: 'loading' } as TicketTableState },
  );

  // The last page of rows we received. While a new page is loading we keep showing it (dimmed).
  private readonly current = linkedSignal<TicketTableState, PageResponse<TicketListItem> | null>({
    source: this.state,
    computation: (state, previous) => {
      if (state.status === 'success') {
        return state.data;
      }
      if (state.status === 'loading') {
        return previous?.value ?? null;
      }
      return null;
    },
  });

  protected readonly status = computed(() => this.state().status);
  protected readonly isLoading = computed(() => this.status() === 'loading');
  protected readonly errorText = computed(() => {
    const state = this.state();
    return state.status === 'error' ? state.message : null;
  });

  protected readonly tickets = computed(() => this.current()?.content ?? []);
  protected readonly totalElements = computed(() => this.current()?.totalElements ?? 0);
  protected readonly totalPages = computed(() => Math.max(this.current()?.totalPages ?? 1, 1));
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
      const state = this.state();
      if (state.status === 'success') {
        const lastPage = Math.max(state.data.totalPages, 1);
        if (state.data.page > lastPage) {
          untracked(() => this.navigate({ ...this.query(), page: lastPage }, true));
        }
      } else if (state.status === 'empty') {
        untracked(() => {
          if (this.query().page > 1) {
            this.navigate({ ...this.query(), page: 1 }, true);
          }
        });
      }
    });
  }

  protected retry() {
    this.attempt.update((n) => n + 1);
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
