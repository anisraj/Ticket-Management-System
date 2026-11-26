import {
  Component,
  ElementRef,
  Injector,
  afterNextRender,
  computed,
  inject,
  linkedSignal,
  signal,
  viewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth-service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.html',
  host: {
    '(document:click)': 'onDocumentClick($event)',
    '(keydown.escape)': 'close(true)',
    '(focusout)': 'onFocusOut($event)',
  },
})
export class UserMenu {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly injector = inject(Injector);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  private readonly trigger = viewChild<ElementRef<HTMLButtonElement>>('trigger');
  private readonly logoutItem = viewChild<ElementRef<HTMLButtonElement>>('logoutItem');

  protected readonly user = this.auth.user;
  protected readonly open = signal(false);

  // Google users have a name and a picture. Others have a name too, but no picture.
  protected readonly displayName = computed(() => {
    const user = this.user();
    return user?.name?.trim() || user?.email || '';
  });
  protected readonly picture = computed(() => this.user()?.pictureUrl || null);

  // If the picture cannot be loaded, we show the default avatar.
  // linkedSignal starts again with "not failed" whenever the picture address changes.
  protected readonly pictureFailed = linkedSignal<string | null, boolean>({
    source: this.picture,
    computation: () => false,
  });
  protected readonly showPicture = computed(() => this.picture() !== null && !this.pictureFailed());

  protected toggle() {
    if (this.open()) {
      this.close(true);
      return;
    }
    this.open.set(true);
    // after the menu is drawn, move the focus to its first item (for keyboard users)
    afterNextRender(() => this.logoutItem()?.nativeElement.focus(), { injector: this.injector });
  }

  protected close(returnFocus = false) {
    if (!this.open()) {
      return;
    }
    this.open.set(false);
    if (returnFocus) {
      this.trigger()?.nativeElement.focus();
    }
  }

  // A click anywhere outside the menu closes it.
  protected onDocumentClick(event: MouseEvent) {
    if (this.open() && !this.host.nativeElement.contains(event.target as Node)) {
      this.close();
    }
  }

  // Tab moved the focus out of the menu: close it.
  protected onFocusOut(event: FocusEvent) {
    const next = event.relatedTarget as Node | null;
    if (this.open() && next && !this.host.nativeElement.contains(next)) {
      this.close();
    }
  }

  protected async logout() {
    this.close();
    this.auth.logout();
    await this.router.navigateByUrl('/login');
  }
}
