import { ParamMap, Params } from '@angular/router';
import { PAGE_SIZES, SORT_FIELDS, SortField, TicketPageQuery, TicketSort } from './ticket.model';

export const DEFAULT_QUERY: TicketPageQuery = {
  page: 1,
  size: 10,
  sort: { field: 'createdAt', direction: 'desc' },
  q: '',
};

const MAX_PAGE = 1_000_000;
export const MAX_SEARCH_LENGTH = 100;
const QUERY_KEYS = ['page', 'size', 'sort', 'q'] as const;

// URL -> clean query. Anything wrong becomes the default.
export function parseTicketQuery(params: ParamMap): TicketPageQuery {
  return {
    page: parsePage(params.get('page')),
    size: parseSize(params.get('size')),
    sort: parseSort(params.get('sort')),
    q: parseSearch(params.get('q')),
  };
}

// query -> URL params. Default values become null, which removes them from the URL.
export function toQueryParams(query: TicketPageQuery): Params {
  return {
    page: query.page === DEFAULT_QUERY.page ? null : query.page,
    size: query.size === DEFAULT_QUERY.size ? null : query.size,
    sort: sameSort(query.sort, DEFAULT_QUERY.sort) ? null : `${query.sort.field},${query.sort.direction}`,
    q: query.q === '' ? null : query.q,
  };
}

// true when the URL already shows exactly the clean version of the query
export function isCanonical(params: ParamMap, query: TicketPageQuery): boolean {
  const clean = toQueryParams(query);
  return QUERY_KEYS.every(
    (key) => (params.get(key) ?? null) === (clean[key] == null ? null : String(clean[key])),
  );
}

export function sameQuery(a: TicketPageQuery, b: TicketPageQuery): boolean {
  return a.page === b.page && a.size === b.size && sameSort(a.sort, b.sort) && a.q === b.q;
}

function sameSort(a: TicketSort, b: TicketSort): boolean {
  return a.field === b.field && a.direction === b.direction;
}

function parsePage(value: string | null): number {
  const page = Number(value);
  return Number.isSafeInteger(page) && page >= 1 && page <= MAX_PAGE ? page : DEFAULT_QUERY.page;
}

function parseSize(value: string | null): number {
  const size = Number(value);
  return (PAGE_SIZES as readonly number[]).includes(size) ? size : DEFAULT_QUERY.size;
}

function parseSort(value: string | null): TicketSort {
  const [field, direction] = (value ?? '').split(',');
  if ((SORT_FIELDS as readonly string[]).includes(field) && (direction === 'asc' || direction === 'desc')) {
    return { field: field as SortField, direction };
  }
  return { ...DEFAULT_QUERY.sort };
}

function parseSearch(value: string | null): string {
  return (value ?? '').trim().slice(0, MAX_SEARCH_LENGTH).trim();
}
