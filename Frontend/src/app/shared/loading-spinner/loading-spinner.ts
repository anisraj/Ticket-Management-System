import { Component, inject } from '@angular/core';
import { LoadingService } from '../../core/loading/loading-service';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.html',
})
export class LoadingSpinner {
  protected readonly loading = inject(LoadingService);
}
