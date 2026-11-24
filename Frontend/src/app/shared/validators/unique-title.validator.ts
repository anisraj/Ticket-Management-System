import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, catchError, map, of, switchMap, timer } from 'rxjs';

export const TITLE_DEBOUNCE_MS = 400;

// The check is passed in as a function, so this file does not depend on any feature or service.
export function uniqueTitle(
  titleExists: (title: string) => Observable<boolean>,
  debounceMs = TITLE_DEBOUNCE_MS,
): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const title = String(control.value ?? '').trim();

    if (!title) {
      return of(null); // an empty title is the job of "required"
    }

    return timer(debounceMs).pipe(
      switchMap(() => titleExists(title)),
      map((exists) => (exists ? { titleTaken: true } : null)),
      // If the check itself fails (server down), do not block the user.
      // The server checks again when the ticket is saved.
      catchError(() => of(null)),
    );
  };
}
