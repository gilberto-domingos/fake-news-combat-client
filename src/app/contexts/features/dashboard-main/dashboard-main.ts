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
export class DashboardMain implements AfterViewInit {
  private dashboardService = inject(DashboardMainService);
  private destroyRef = inject(DestroyRef);

  displayedColumns: string[] = [
    'sessionId',
    'route',
    'timestamp',
    'city',
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
  paginatorReady: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  loadAnalytics(): void {
    this.dashboardService
      .getAll({
        page: this.page(),
        pageSize: this.pageSize(),
        search: '',
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.analytics.set(response);
          this.totalItems.set(100);
          console.log('INFORMACOES DA TABELA', response);
        },
      });
  }

  onPageChange(event: PageEvent): void {
    this.page.set(event.pageIndex + 1);
    this.pageSize.set(event.pageSize);

    this.loadAnalytics();

    // console.log('NUMERO DA PAGINA:', event.pageIndex);
    // console.log('ENVIANDO PARA BACKEND:', event.pageSize);
  }

  ngAfterViewInit(): void {
    this.paginatorReady = true;
    this.loadAnalytics();
  }
}
