import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { TranslocoService } from '@jsverse/transloco';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'app-terms-conditions',
  imports: [MatCardModule, MatDividerModule, TranslocoDirective],
  templateUrl: './terms-conditions.html',
  styleUrl: './terms-conditions.scss',
})
export class TermsConditions {
  private translocoService = inject(TranslocoService);
}
