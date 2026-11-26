import { Injectable } from '@angular/core';

// Only the small part of the Google Identity Services script that we use.
export interface GoogleCredentialResponse {
  credential: string; // the Google ID token (a JWT)
}

interface GoogleButtonOptions {
  type?: 'standard' | 'icon';
  theme?: 'outline' | 'filled_blue' | 'filled_black';
  size?: 'large' | 'medium' | 'small';
  text?: 'signin_with' | 'signup_with' | 'continue_with' | 'signin';
  shape?: 'rectangular' | 'pill';
  width?: number;
}

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize(config: {
            client_id: string;
            callback: (response: GoogleCredentialResponse) => void;
          }): void;
          renderButton(parent: HTMLElement, options: GoogleButtonOptions): void;
        };
      };
    };
  }
}

@Injectable({ providedIn: 'root' })
export class GoogleIdentityService {
  private scriptLoading: Promise<void> | null = null;

  // Loads the Google script once. If it fails, the next call tries again.
  load(): Promise<void> {
    if (window.google?.accounts?.id) {
      return Promise.resolve();
    }
    this.scriptLoading ??= new Promise<void>((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = () => {
        this.scriptLoading = null;
        reject(new Error('Could not load the Google sign-in script'));
      };
      document.head.appendChild(script);
    });
    return this.scriptLoading;
  }
}
