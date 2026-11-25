import { HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, of, startWith } from 'rxjs';

// One type for "what a piece of the screen is doing right now".
export type LoadState<T> =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'empty' }
  | { status: 'success'; data: T };

// Turns a request into a stream of states: loading, then success, empty or error.
// The error is caught here, so the stream never fails and can be used inside switchMap or forkJoin.
export function toLoadState<T>(isEmpty: (data: T) => boolean = () => false) {
  return (source: Observable<T>): Observable<LoadState<T>> =>
    source.pipe(
      map((data): LoadState<T> => (isEmpty(data) ? { status: 'empty' } : { status: 'success', data })),
      catchError((error: unknown) =>
        of<LoadState<T>>({ status: 'error', message: errorMessage(error) }),
      ),
      startWith<LoadState<T>>({ status: 'loading' }),
    );
}

export function errorMessage(error: unknown): string {
  if (error instanceof HttpErrorResponse) {
    if (error.status === 0) {
      return 'Cannot reach the server.';
    }
    if (error.status >= 500) {
      return 'The server had a problem. Please try again.';
    }
    if (error.status === 400) {
      return 'The request was not valid.';
    }
    if (error.status === 403) {
      return 'You are not allowed to see this.';
    }
    if (error.status === 404) {
      return 'This was not found.';
    }
  }
  return 'Something went wrong. Please try again.';
}
