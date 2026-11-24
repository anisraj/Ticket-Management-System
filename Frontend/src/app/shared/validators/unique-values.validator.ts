import { AbstractControl, ValidationErrors } from '@angular/forms';

export function uniqueValues(control: AbstractControl): ValidationErrors | null {
  const values = (control.value as string[])
    .map((v) => String(v ?? '').trim().toLowerCase())
    .filter((v) => v !== '');

  return new Set(values).size === values.length ? null : { duplicates: true };
}
