import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function escalationNotAfterDue(dueKey: string, escalationKey: string): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const due = group.get(dueKey)?.value;
    const escalation = group.get(escalationKey)?.value;

    if (!due || !escalation) {
      return null; // if one date is empty, there is nothing to compare
    }
    return escalation <= due ? null : { escalationAfterDue: true };
  };
}
