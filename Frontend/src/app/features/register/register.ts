import { JsonPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Role } from '../../core/auth/auth-service';
import { ToastService } from '../../core/toast/toast-service';

type Gender = 'Male' | 'Female' | 'Other' | 'Prefer not to say';
type FieldName = 'name' | 'age' | 'gender' | 'mobile' | 'email' | 'role';

interface Registration {
  name: string;
  age: number;
  gender: Gender;
  isActive: boolean;
  mobile: string;
  email: string;
  role: Role;
}

const MIN_AGE = 18;
const MAX_AGE = 100;

const GENDERS: Gender[] = ['Male', 'Female', 'Other', 'Prefer not to say'];
const ROLES: { value: Role; label: string }[] = [
  { value: 'ADMIN', label: 'Admin' },
  { value: 'USER', label: 'User' },
];

// A name made only of spaces is not a name. Reuses the "required" message.
const notBlank: ValidatorFn = (control) =>
  String(control.value ?? '').trim() ? null : { required: true };

// One message per field and per error key
const ERROR_MESSAGES: Record<FieldName, Record<string, string>> = {
  name: {
    required: 'Name is required.',
    minlength: 'Name must be at least 2 characters.',
    maxlength: 'Name can be at most 100 characters.',
  },
  age: {
    required: 'Age is required.',
    min: `Age must be at least ${MIN_AGE}.`,
    max: `Age must be at most ${MAX_AGE}.`,
    pattern: 'Age must be a whole number.',
  },
  gender: { required: 'Please select a gender.' },
  mobile: {
    required: 'Mobile number is required.',
    pattern: 'Enter a valid 10-digit mobile number.',
  },
  email: {
    required: 'Email is required.',
    email: 'Enter a valid email address.',
    maxlength: 'Email can be at most 255 characters.',
  },
  role: { required: 'Please select a role.' },
};

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, JsonPipe],
  templateUrl: './register.html',
})
export class Register {
  private readonly toast = inject(ToastService);

  protected readonly genders = GENDERS;
  protected readonly roles = ROLES;

  // null = show the form, an object = show the result
  protected readonly submitted = signal<Registration | null>(null);

  protected readonly form = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        notBlank,
        Validators.minLength(2),
        Validators.maxLength(100),
      ],
    }),
    age: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(MIN_AGE),
      Validators.max(MAX_AGE),
      Validators.pattern(/^\d+$/),
    ]),
    gender: new FormControl<Gender | ''>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    isActive: new FormControl(true, { nonNullable: true }),
    mobile: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email, Validators.maxLength(255)],
    }),
    role: new FormControl<Role | ''>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  protected errorOf(name: FieldName): string | null {
    const control = this.form.controls[name];

    if (!control.touched || !control.errors) {
      return null;
    }
    const firstErrorKey = Object.keys(control.errors)[0];
    return ERROR_MESSAGES[name][firstErrorKey] ?? 'This value is not valid.';
  }

  protected submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    this.submitted.set({
      name: value.name.trim(),
      age: Number(value.age),
      gender: value.gender as Gender,
      isActive: value.isActive,
      mobile: value.mobile.trim(),
      email: value.email.trim().toLowerCase(),
      role: value.role as Role,
    });
    this.toast.success('Registration form submitted.');
  }

  protected registerAnother() {
    this.form.reset();
    this.submitted.set(null);
  }
}
