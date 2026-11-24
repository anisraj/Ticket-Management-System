import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService, Role } from '../auth/auth-service';

export const roleGuard: CanActivateFn = (route) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const allowedRoles = (route.data['roles'] ?? []) as Role[];
  const role = auth.role();

  if (role && allowedRoles.includes(role)) {
    return true;
  }

  return router.createUrlTree(['/unauthorized']);
};