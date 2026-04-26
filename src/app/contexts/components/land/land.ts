import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { HealthzService } from './services/healthz-service';

@Component({
  selector: 'app-land',
  imports: [MatCardModule],
  templateUrl: './land.html',
  styleUrl: './land.scss',
})
export class Land implements OnInit {
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
