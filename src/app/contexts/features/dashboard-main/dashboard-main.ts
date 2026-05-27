import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DashboardMainService } from './dashboard-main-service';
import { AnalyticsResDto } from './../../../core/analytics-access/analytics.res.dto';
import { signal } from '@angular/core';

import { ViewChild, AfterViewInit, inject, DestroyRef, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule, SortDirection } from '@angular/material/sort';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard-main',
  imports: [
    CommonModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  standalone: true,
  templateUrl: './dashboard-main.html',
  styleUrl: './dashboard-main.scss',
})
export class DashboardMain implements OnInit {
  private dashboardService = inject(DashboardMainService);
  private destroyRef = inject(DestroyRef);

  displayedColumns: string[] = [
    'sessionId',
    'route',
    'timestamp',
    'language',
    'timezone',
    'ip_address',
    'country',
    'bot_detection',
    'authenticate_user_id',
  ];

  page = signal(1);
  pageSize = signal(5);
  totalItems = signal(0);

  analytics = signal<AnalyticsResDto[]>([]);
  loading = signal(false);
  errorMessage = signal<string | null>(null);

  ngOnInit(): void {
    this.loadAnalytics();
  }

  loadAnalytics(): void {
    this.loading.set(true);

    this.errorMessage.set(null);

    this.dashboardService
      .getAll({
        page: this.page(),
        pageSize: this.pageSize(),
        search: '',
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response: AnalyticsResDto[]) => {
          console.log('INFORMAÇÕES DO BANCO', response);
          this.analytics.set(response);
          this.totalItems.set(100);
          this.loading.set(false);
        },

        error: (error: Error) => {
          this.errorMessage.set(error.message);

          this.loading.set(false);
        },
      });
  }

  onPageChange(event: PageEvent): void {
    this.page.set(event.pageIndex + 1);

    this.pageSize.set(event.pageSize);

    this.loadAnalytics();
  }
}
