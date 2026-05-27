import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ChangeDetectionStrategy, DestroyRef, OnInit, inject } from '@angular/core';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DashboardMainService } from './dashboard-main-service';
import { AnalyticsResDto } from './../../../core/analytics-access/analytics.res.dto';

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
  ],
  templateUrl: './dashboard-main.html',
  styleUrl: './dashboard-main.scss',
  standalone: true,
})
export class DashboardMain implements OnInit {
  private dashboardService = inject(DashboardMainService);
  private destroyRef = inject(DestroyRef);

  analytics: AnalyticsResDto[] = [];

  loading: boolean = false;
  errorMessage: string | null = null;

  displayedColumns: string[] = ['id', 'route', 'sessionId', 'timestamp', 'user_agent'];

  ngOnInit(): void {
    this.loadAnalytics();
  }

  loadAnalytics(): void {
    this.loading = true;
    this.errorMessage = null;

    this.dashboardService
      .getAll({ page: 1, pageSize: 10, search: '' })
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => {
          this.loading = false;
        }),
      )
      .subscribe({
        next: (response: AnalyticsResDto[]) => {
          this.analytics = response;
          console.log('INFORMAÇÕES DO BANCO', this.analytics);
        },
        error: (error: Error) => {
          this.errorMessage = error.message;
          console.error('Error loading analitics access:', error);
        },
      });
  }
}
