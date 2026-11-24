import { HttpContext, HttpContextToken } from '@angular/common/http';

export const SKIP_LOADING = new HttpContextToken<boolean>(() => false);

export function skipLoading(): HttpContext {
  return new HttpContext().set(SKIP_LOADING, true);
}
