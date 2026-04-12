import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ServiceLoader } from './service-loader';

@Component({
  selector: 'app-spinner-loading',
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './spinner-loading.html',
  styleUrl: './spinner-loading.scss',
  standalone: true,
})
export class SpinnerLoading {
  service = inject(ServiceLoader);
}
