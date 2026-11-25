import { DatePipe } from '@angular/common';
import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ActivityAction, ActivityItem, DashboardSummary } from '../model/dashboard.model';
import { DashboardService } from '../service/dashboard-service';
import {LoadState, toLoadState} from '../../../shared/model/load-state';

const ACTIVITY_LIMIT = 10;

const ACTION_TEXT: Record<ActivityAction, string> = {
  CREATED: 'created',
  STATUS_CHANGED: 'changed the status of',
  ASSIGNED: 'assigned',
};

@Component({
  imports: [DatePipe, RouterLink],
  selector: 'app-dashboard',
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
})
export class Dashboard {
  private readonly dashboardService = inject(DashboardService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly placeholders = [1, 2, 3, 4, 5, 6];

  // Each widget has its own state, so one can fail while the other works.
  protected readonly summary = signal<LoadState<DashboardSummary>>({ status: 'loading' });
  protected readonly activity = signal<LoadState<ActivityItem[]>>({ status: 'loading' });

  protected readonly isLoading = computed(
    () => this.summary().status === 'loading' || this.activity().status === 'loading',
  );

  protected readonly summaryError = computed(() => {
    const state = this.summary();
    return state.status === 'error' ? state.message : null;
  });

  protected readonly activityError = computed(() => {
    const state = this.activity();
    return state.status === 'error' ? state.message : null;
  });

  protected readonly activityItems = computed(() => {
    const state = this.activity();
    return state.status === 'success' ? state.data : [];
  });

  protected readonly cards = computed(() => {
    const state = this.summary();
    if (state.status !== 'success') {
      return [];
    }
    const s = state.data;
    return [
      { label: 'Total', value: s.total, warn: false },
      { label: 'Open', value: s.open, warn: false },
      { label: 'In progress', value: s.inProgress, warn: false },
      { label: 'Blocked', value: s.blocked, warn: false },
      { label: 'Closed', value: s.closed, warn: false },
      { label: 'Overdue', value: s.overdue, warn: s.overdue > 0 },
    ];
  });

  constructor() {
    this.loadAll();
  }

  protected refresh() {
    if (!this.isLoading()) {
      this.loadAll();
    }
  }

  protected actionText(action: ActivityAction): string {
    return ACTION_TEXT[action];
  }

  // Both requests start together. forkJoin waits until BOTH have finished, then gives both results at once.
  // The error of each request is caught inside toLoadState, so one failure does not cancel the other.
  private loadAll() {
    this.summary.set({ status: 'loading' });
    this.activity.set({ status: 'loading' });

    forkJoin({
      summary: this.dashboardService.getSummary().pipe(toLoadState()),
      activity: this.dashboardService
        .getActivity(ACTIVITY_LIMIT)
        .pipe(toLoadState((items) => items.length === 0)),
    })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(({ summary, activity }) => {
        this.summary.set(summary);
        this.activity.set(activity);
      });
  }

  // Try again for one widget only: just that request is sent again.
  protected retrySummary() {
    this.dashboardService
      .getSummary()
      .pipe(toLoadState(), takeUntilDestroyed(this.destroyRef))
      .subscribe((state) => this.summary.set(state));
  }

  protected retryActivity() {
    this.dashboardService
      .getActivity(ACTIVITY_LIMIT)
      .pipe(
        toLoadState((items) => items.length === 0),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((state) => this.activity.set(state));
  }
}
