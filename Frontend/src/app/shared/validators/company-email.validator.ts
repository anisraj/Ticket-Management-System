import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function companyEmail(domain: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = String(control.value ?? '').trim().toLowerCase();

    if (!value) {
      return null; // an empty value is the job of "required", not of this validator
    }
    return value.endsWith(`@${domain}`) ? null : { companyDomain: { domain } };
  };
}
