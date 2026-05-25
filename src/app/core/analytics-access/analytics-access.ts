import { Component, inject, OnInit } from '@angular/core';
import { AnalyticsService } from './analytics-service';

@Component({
  selector: 'app-analytics-access',
  imports: [],
  templateUrl: './analytics-access.html',
  styleUrl: './analytics-access.scss',
})
export class AnalyticsAccess {
  analyticsService = inject(AnalyticsService);

  analyticsAccess(): void {
    this.analyticsService.registerAccess().subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
