import {Component, inject, signal} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {AuthService} from '../../auth/auth-service';
import {UserMenu} from '../user-menu/user-menu';
import {BreakpointObserver} from '@angular/cdk/layout';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

const DESKTOP_QUERY = '(min-width: 64rem)';

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, UserMenu],
  templateUrl: './shell.html',
  host: { '(document:keydown.escape)': 'closeNav()' },
})
export class Shell {
  readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly navOpen = signal(false);

  protected readonly menuItems = [
    { label: 'Tickets', path: '/tickets', allowedRoles: null },
    { label: 'Tickets (Infinite Scroll)', path: '/tickets/infinite', allowedRoles: null },
    { label: 'Dashboard', path: '/admin/dashboard', allowedRoles: ['ADMIN'] },
    { label: 'Reports', path: '/admin/reports', allowedRoles: ['ADMIN'] },
  ];

  constructor() {
    // When the window grows to desktop size, reset the drawer so it does not
    // come back open when the window is shrunk again.
    inject(BreakpointObserver)
      .observe(DESKTOP_QUERY)
      .pipe(takeUntilDestroyed())
      .subscribe(({ matches }) => {
        if (matches) {
          this.closeNav();
        }
      });
  }

  protected closeNav() {
    this.navOpen.set(false);
  }

  protected toggleNav() {
    this.navOpen.update((open) => !open);
  }

  protected menuClick(path: string) {
    this.closeNav();
    this.router.navigate([path]);
  }
}
