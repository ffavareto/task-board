import { inject, Injectable, signal } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  public message = signal('');
  private snackBar = inject(MatSnackBar);
  public durationInMiliSeconds = 4000;
  public horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  public verticalPosition: MatSnackBarVerticalPosition = 'top';

  public showSnackBar(
    message: string,
    duration: number = this.durationInMiliSeconds,
    horizontalPosition: MatSnackBarHorizontalPosition = 'end',
    verticalPosition: MatSnackBarVerticalPosition = 'top'
  ): void {
    this.message.set(message);
    this.durationInMiliSeconds = duration;
    this.horizontalPosition = horizontalPosition;
    this.verticalPosition = verticalPosition;
    this.openSnackBar();
  }

  private openSnackBar(): void {
    this.snackBar.open(this.message(), '❌', {
      duration: this.durationInMiliSeconds,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
