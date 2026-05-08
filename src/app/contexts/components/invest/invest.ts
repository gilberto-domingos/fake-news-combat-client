import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { InvestApiService } from './invest-api-service';

@Component({
  selector: 'app-invest',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './invest.html',
  styleUrl: './invest.scss',
})
export class Invest {
  private fb = inject(FormBuilder);
  private dialogRef = inject<MatDialogRef<Invest> | null>(MatDialogRef, { optional: true });
  private dialog = inject(MatDialog);
  private investApiService = inject(InvestApiService);

  protected loading = signal(false);

  openDialog() {
    this.dialog.open(Invest, {
      width: '90%',
      maxWidth: '500px',
    });
  }

  protected form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    proposal: ['', [Validators.required, Validators.minLength(10)]],
    email: ['', [Validators.required]],
  });

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);

    const payload = this.form.getRawValue();

    setTimeout(() => {
      this.loading.set(false);
      this.dialogRef?.close(payload);
    }, 1000);

    this.investApiService.create(this.form.getRawValue()).subscribe({
      next: (response) => {
        this.loading.set(false);
        this.dialogRef?.close(response);
      },
      error: () => {
        this.loading.set(false);
        2;
      },
    });
  }

  protected close(): void {
    this.dialogRef?.close();
  }
}
