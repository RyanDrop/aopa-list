import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'aopa-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
})
export class LoginDialogComponent {
  constructor(private dialogRef: MatDialogRef<LoginDialogComponent>) {}
  dialogForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  matcher = new ErrorStateMatcher();

  get emailFormControl() {
    return this.dialogForm.controls.email as FormControl;
  }

  get passwordFormControl() {
    return this.dialogForm.controls.password as FormControl;
  }

  submitForm() {
    if (!this.dialogForm.valid) return;
    const formValue = this.dialogForm.value;
    this.dialogRef.close(formValue);
  }
}
