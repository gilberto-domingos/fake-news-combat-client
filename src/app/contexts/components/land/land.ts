import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { HealthzService } from './services/healthz-service';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-land',
  imports: [MatCardModule, MatButtonModule, MatButtonToggleModule, CommonModule, FormsModule],
  templateUrl: './land.html',
  styleUrl: './land.scss',
})
export class Land implements OnInit {
  active = 'en';

  isLoading = true;

  healthzService = inject(HealthzService);

  ngOnInit(): void {
    const start = performance.now();

    this.healthzService.checkHealthz().subscribe({
      next: () => {
        console.log('Healthz backend :');
        const duration = performance.now() - start;
        console.log(`Time to check healthz OK :', ${duration}ms`);
      },
      error: () => {
        console.warn('Check healthz backend is no wakeup, Warning !');
        const duration = performance.now() - start;
        console.warn(`Error check healthz backend after ${duration} ms`);
      },
    });
  }
}
