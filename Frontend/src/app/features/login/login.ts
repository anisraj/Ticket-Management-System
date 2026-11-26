import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../core/auth/auth-service';
import {GoogleButton} from './google-button';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, GoogleButton],
  templateUrl: './login.html',
})
export class Login {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  protected readonly loading = signal(false);
  protected readonly errorMessage = signal<string | null>(null);

  protected readonly showPassword = signal(false);

  protected readonly form = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6)]
    }),
  });

  protected togglePassword() {
    this.showPassword.update((v) => !v);
  }

  protected errorOf(name: 'email' | 'password'): string | null {
    const control = this.form.controls[name];

    if (!control.touched || !control.errors) {
      return null;
    }
    if (control.hasError('required')) {
      return name === 'email' ? 'Email is required.' : 'Password is required.';
    }
    if (control.hasError('email')) {
      return 'Enter a valid email address.';
    }
    if (control.hasError('minlength')) {
      const min = control.getError('minlength').requiredLength;
      return `Password must be at least ${min} characters.`;
    }
    return null;
  }

  protected submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.errorMessage.set(null);

    this.auth.login(this.form.getRawValue()).subscribe({
      next: () => this.onLoggedIn(),
      error: (err: HttpErrorResponse) => {
        this.loading.set(false);
        this.errorMessage.set(
          err.status === 401
            ? 'Wrong email or password.'
            : 'Cannot reach the server. Please try again.',
        );
      },
    });
  }

  protected loginWithGoogle(idToken: string) {
    this.loading.set(true);
    this.errorMessage.set(null);

    this.auth.googleLogin(idToken).subscribe({
      next: () => this.onLoggedIn(),
      error: (err: HttpErrorResponse) => {
        this.loading.set(false);
        this.errorMessage.set(this.googleErrorMessage(err.status));
      },
    });
  }

  private onLoggedIn() {
    this.loading.set(false);
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
    const target = returnUrl?.startsWith('/') ? returnUrl : '/tickets';
    this.router.navigateByUrl(target);
  }

  private googleErrorMessage(status: number): string {
    if (status === 401) {
      return 'Google sign-in failed. Please try again.';
    }
    if (status === 503) {
      return 'Google sign-in is not available right now.';
    }
    return 'Cannot reach the server. Please try again.';
  }
}
