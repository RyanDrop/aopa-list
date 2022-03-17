import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { FirebaseService } from '@aopa/services';
import { CustomValidators } from '@aopa/validators';

@Component({
  selector: 'aopa-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {
  loginFormGroup: FormGroup;
  registerFormGroup: FormGroup;
  area = {
    height: 'auto',
    width: '440px',
  };
  constructor(
    private firebase: FirebaseService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.createForms();
  }

  createForms() {
    this.loginFormGroup = new FormGroup({
      loginEmail: new FormControl(null, [
        Validators.required,
        Validators.email,
      ]),
      loginPassword: new FormControl(null, [
        Validators.required,
        CustomValidators.password,
      ]),
    });

    this.registerFormGroup = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        CustomValidators.personName,
      ]),
      occupation: new FormControl(null, [
        Validators.required,
        CustomValidators.occupation,
      ]),
      registerEmail: new FormControl(null, [
        Validators.required,
        Validators.email,
      ]),
      registerPassword: new FormControl(null, [
        Validators.required,
        CustomValidators.password,
      ]),

      confirmPassword: new FormControl(null, [
        Validators.required,
        CustomValidators.matchPassword('registerPassword'),
      ]),
    });
  }

  matcher = new ErrorStateMatcher();

  get loginEmail() {
    return this.loginFormGroup.controls.loginEmail as FormControl;
  }

  get loginPassword() {
    return this.loginFormGroup.controls.loginPassword as FormControl;
  }

  get registerEmail() {
    return this.registerFormGroup.controls.registerEmail as FormControl;
  }

  get registerPassword() {
    return this.registerFormGroup.controls.registerPassword as FormControl;
  }

  get confirmPassword() {
    return this.registerFormGroup.controls.confirmPassword as FormControl;
  }

  get nameControl(): FormControl {
    return this.registerFormGroup.controls.name as FormControl;
  }

  get occupationControl(): FormControl {
    return this.registerFormGroup.controls.occupation as FormControl;
  }

  login() {
    this.firebase.login(this.loginEmail.value, this.loginPassword.value);
    this.router.navigate(['/']);
  }

  register() {
    this.firebase.register({
      name: this.nameControl.value,
      occupation: this.occupationControl.value,
      email: this.registerEmail.value,
      password: this.registerPassword.value,
    });
    this.router.navigate(['/']);
  }
}
