import { Component, inject, signal } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  TICKET_PRIORITIES,
  TICKET_TYPES,
  TicketPriority,
  TicketType,
} from '../model/ticket.model';
import { JsonPipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { companyEmail } from '../../../shared/validators/company-email.validator';
import { escalationNotAfterDue } from '../../../shared/validators/date-order.validator';
import { uniqueValues } from '../../../shared/validators/unique-values.validator';
import { TicketService } from '../service/ticket-service';
import { uniqueTitle } from '../../../shared/validators/unique-title.validator';

type FieldName = 'title' | 'type' | 'priority'
  | 'description' | 'dueDate' | 'escalationDate'
  | 'stepsToReproduce' | 'managerEmail' | 'justification';

const COMPANY_DOMAIN = 'qburst.com';

@Component({
  selector: 'app-ticket-form',
  imports: [ReactiveFormsModule, RouterLink, JsonPipe],
  templateUrl: './new-ticket.html',
})
export class NewTicket {
  private readonly fb = inject(FormBuilder);
  private readonly ticketService = inject(TicketService);

  protected readonly types = TICKET_TYPES;
  protected readonly priorities = TICKET_PRIORITIES;

  protected readonly submitted = signal<unknown>(null);

  protected readonly form = this.fb.nonNullable.group(
    {
      title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(80)], [uniqueTitle((title) => this.ticketService.titleExists(title))]],
      type: ['FEATURE' as TicketType, [Validators.required]],
      priority: ['MEDIUM' as TicketPriority, [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      dueDate: [''],
      escalationDate: [''],
      stepsToReproduce: [''],
      managerEmail: [''],
      justification: [''],
      watchers: new FormArray<FormControl<string>>([], { validators: [uniqueValues] }),
    },
    { validators: [escalationNotAfterDue('dueDate', 'escalationDate')] },
  );

  protected readonly watchers = this.form.controls.watchers;
  protected readonly maxWatchers = 5;

  protected readonly isBug = signal(false);
  protected readonly isAccessRequest = signal(false);
  protected readonly isCritical = signal(false);

  protected readonly companyDomain = COMPANY_DOMAIN;

  constructor() {
    this.form.controls.type.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.applyTypeRules());

    this.form.controls.priority.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.applyPriorityRules());

    this.applyTypeRules();
    this.applyPriorityRules();
  }

  private applyTypeRules() {
    const type = this.form.controls.type.value;

    this.isBug.set(type === 'BUG');
    this.isAccessRequest.set(type === 'ACCESS_REQUEST');

    this.setRule(this.form.controls.stepsToReproduce, type === 'BUG', [
      Validators.required,
      Validators.minLength(10),
    ]);
    this.setRule(this.form.controls.managerEmail, type === 'ACCESS_REQUEST', [
      Validators.required,
      Validators.email,
      companyEmail(COMPANY_DOMAIN),
    ]);
  }

  private applyPriorityRules() {
    const priority = this.form.controls.priority.value;

    this.isCritical.set(priority === 'CRITICAL');

    this.setRule(this.form.controls.justification, priority === 'CRITICAL', [
      Validators.required,
      Validators.minLength(10),
    ]);
  }

  private setRule(control: FormControl<string>, active: boolean, validators: ValidatorFn[]) {
    if (active) {
      control.setValidators(validators);
    } else {
      control.clearValidators();
      control.reset('', { emitEvent: false });
    }
    control.updateValueAndValidity({ emitEvent: false });
  }

  protected addWatcher() {
    if (this.watchers.length >= this.maxWatchers) {
      return;
    }
    this.watchers.push(
      new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),
    );
  }

  protected removeWatcher(index: number) {
    this.watchers.removeAt(index);
  }

  protected errorOf(name: FieldName): string | null {
    const control = this.form.controls[name];

    if (!control.touched || !control.errors) {
      return null;
    }
    if (control.hasError('required')) {
      return 'This field is required.';
    }
    if (control.hasError('minlength')) {
      return `Enter at least ${control.getError('minlength').requiredLength} characters.`;
    }
    if (control.hasError('maxlength')) {
      return `Enter at most ${control.getError('maxlength').requiredLength} characters.`;
    }
    if (control.hasError('email')) {
      return 'Enter a valid email address.';
    }
    if (control.hasError('companyDomain')) {
      return `Use your @${this.companyDomain} email address.`;
    }
    if (control.hasError('titleTaken')) {
      return 'A ticket with this title already exists.';
    }
    return null;
  }

  protected dateOrderError(): boolean {
    const c = this.form.controls;
    return (
      this.form.hasError('escalationAfterDue') && (c.dueDate.touched || c.escalationDate.touched)
    );
  }

  protected watcherError(control: FormControl<string>): string | null {
    if (!control.touched || !control.errors) {
      return null;
    }
    if (control.hasError('required')) {
      return 'Enter an email, or remove this row.';
    }
    return 'Enter a valid email address.';
  }

  protected duplicateError(): boolean {
    return this.watchers.hasError('duplicates') && this.watchers.controls.some((c) => c.touched);
  }

  protected submit() {
    if (this.form.invalid || this.form.pending) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitted.set(this.form.getRawValue());
  }

  protected reset() {
    this.watchers.clear();
    this.form.reset();
    this.submitted.set(null);
  }
}
