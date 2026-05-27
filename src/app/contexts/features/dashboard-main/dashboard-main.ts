import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DashboardMainService } from './dashboard-main-service';
import { AnalyticsResDto } from './../../../core/analytics-access/analytics.res.dto';
import { signal } from '@angular/core';

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

  displayedColumns: string[] = [
    'id',
    'sessionId',
    'route',
    'timestamp',
    'user_agent',
    'language',
    'platform',
    'screen_width',
    'screen_height',
    'timezone',
    'fingerprint',
    'ip_address',
    'country',
    'bot_detection',
    'authenticate_user_id',
  ];

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
      .getAll()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response: AnalyticsResDto[]) => {
          console.log('INFORMAÇÕES DO BANCO', response);

          this.analytics.set(response);

          this.loading.set(false);
        },

        error: (error: Error) => {
          this.errorMessage.set(error.message);

          this.loading.set(false);
        },
      });
  }
}
