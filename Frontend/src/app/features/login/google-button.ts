import {
  Component,
  ElementRef,
  NgZone,
  afterNextRender,
  inject,
  output,
  signal,
  viewChild,
} from '@angular/core';
import {GoogleIdentityService} from '../../core/auth/google-identity';
import {GOOGLE_CLIENT_ID, GOOGLE_CONFIGURED} from '../../core/config/google.config';

@Component({
  selector: 'app-google-button',
  template: `
    <div #host class="flex justify-center"></div>
    @if (message(); as text) {
      <p class="text-center text-sm text-slate-600">{{ text }}</p>
    }
  `,
})
export class GoogleButton {
  private readonly google = inject(GoogleIdentityService);
  private readonly zone = inject(NgZone);
  private readonly host = viewChild.required<ElementRef<HTMLElement>>('host');

  // The Google ID token. The login page sends it to our server.
  readonly credential = output<string>();

  protected readonly message = signal<string | null>(null);

  constructor() {
    // Runs in the browser after the first render, when the host element exists.
    afterNextRender(() => this.setup());
  }

  private async setup() {
    if (!GOOGLE_CONFIGURED) {
      this.message.set('Google sign-in is not set up yet.');
      return;
    }

    try {
      await this.google.load();
    } catch {
      this.message.set('Google sign-in could not be loaded.');
      return;
    }

    const id = window.google!.accounts.id;
    id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      // Google calls this from its own script, so we step back into Angular first.
      callback: (response) => this.zone.run(() => this.credential.emit(response.credential)),
    });
    id.renderButton(this.host().nativeElement, {
      type: 'standard',
      theme: 'outline',
      size: 'large',
      text: 'signin_with',
      width: 320,
    });
  }
}
