import {Component, inject, signal} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {AuthService} from '../../auth/auth-service';
import {UserMenu} from '../user-menu/user-menu';

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, UserMenu],
  templateUrl: './shell.html',
})
export class Shell {
  readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly navOpen = signal(true);

  protected readonly menuItems = [
    { label: 'Tickets', path: '/tickets', allowedRoles: null },
    { label: 'Tickets (Infinite Scroll)', path: '/tickets/infinite', allowedRoles: null },
    { label: 'Dashboard', path: '/admin/dashboard', allowedRoles: ['ADMIN'] },
    { label: 'Reports', path: '/admin/reports', allowedRoles: ['ADMIN'] },
  ];

  protected toggleNav() {
    this.navOpen.update((open) => !open);
  }

  protected menuClick(path: string) {
    this.router.navigate([path]);
  }
}
