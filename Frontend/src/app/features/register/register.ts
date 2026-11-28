import {JsonPipe} from '@angular/common';
import {Component, inject, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators,} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {Role} from '../../core/auth/auth-service';
import {ToastService} from '../../core/toast/toast-service';
import {UserService} from '../../core/user/user-service';
import {CreateUserRequest, Gender, UserDto} from '../../core/user/user.model';
import {finalize} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';

type FieldName = 'name' | 'age' | 'gender' | 'mobile' | 'email' | 'password' | 'role';

const MIN_AGE = 18;
const MAX_AGE = 100;

const GENDERS: { value: Gender; label: string }[] = [
  { value: 'MALE', label: 'Male' },
  { value: 'FEMALE', label: 'Female' },
  { value: 'OTHER', label: 'Other' },
  { value: 'PREFER_NOT_TO_SAY', label: 'Prefer not to say' },
];
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
  password: {
    required: 'Password is required.',
    minlength: 'Password must be at least 6 characters.',
    maxlength: 'Password can be at most 25 characters.',
    pattern: 'Password must contain a letter and a number.',
  },
  role: { required: 'Please select a role.' },
};

const SERVER_FIELDS = ['name', 'age', 'gender', 'mobile', 'email', 'password', 'role'] as const;

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, JsonPipe],
  templateUrl: './register.html',
})
export class Register {
  private readonly toast = inject(ToastService);
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);

  protected readonly showPassword = signal(false);
  protected readonly saving = signal(false);
  protected readonly errorMessage = signal<string | null>(null);

  protected readonly genders = GENDERS;
  protected readonly roles = ROLES;

  protected readonly submitted = signal<UserDto | null>(null);

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
    password: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(25),
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d).+$/),
      ],
    }),
    role: new FormControl<Role | ''>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  protected togglePassword() {
    this.showPassword.update((visible) => !visible);
  }

  protected errorOf(name: FieldName): string | null {
    const control = this.form.controls[name];

    if (!control.touched || !control.errors) {
      return null;
    }
    if (control.hasError('server')) {
      return control.getError('server');
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
    const body: CreateUserRequest = {
      name: value.name.trim(),
      age: Number(value.age),
      gender: value.gender as Gender,
      isActive: value.isActive,
      mobile: value.mobile.trim(),
      email: value.email.trim().toLowerCase(),
      password: value.password,
      role: value.role as CreateUserRequest['role'],
    };

    this.saving.set(true);
    this.errorMessage.set(null);

    this.userService
      .create(body)
      .pipe(finalize(() => this.saving.set(false)))
      .subscribe({
        next: (created) => {
          this.toast.success('Registration successful. Please log in.');
          this.router.navigateByUrl('/login');
        },
        error: (err: HttpErrorResponse) => this.showError(err),
      });
  }

  private showError(err: HttpErrorResponse) {
    // 400 (validation) and 409 (email taken) come as { field: "message" }
    if (err.status === 400 || err.status === 409) {
      const fields = err.error as Record<string, string> | null;
      let shown = false;

      for (const field of SERVER_FIELDS) {
        const message = fields?.[field];
        if (message) {
          this.form.controls[field].setErrors({ server: message });
          shown = true;
        }
      }
      if (shown) {
        return;
      }
    }

    this.errorMessage.set(
      err.status === 0
        ? 'Cannot reach the server. Please try again.'
        : 'Could not register the user. Please try again.',
    );
  }
}
