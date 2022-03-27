import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { CustomValidators } from '@aopa/validators';
import { FirebaseService } from 'app/shared/services/firebase/firebase.service';




@Component({
  selector: 'aopa-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {
  loginFormGroup: FormGroup;
  firstRegisterFormGroup: FormGroup;
  secondRegisterFormGroup: FormGroup;

  constructor(
    private firebase: FirebaseService,
    private readonly router: Router
  ) { }

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

    this.firstRegisterFormGroup = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        CustomValidators.personName,
      ]),
      occupation: new FormControl(null, [
        Validators.required,
        CustomValidators.occupation,
      ]),

    });

    this.secondRegisterFormGroup = new FormGroup({
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
    return this.secondRegisterFormGroup.controls.registerEmail as FormControl;
  }

  get registerPassword() {
    return this.secondRegisterFormGroup.controls.registerPassword as FormControl;
  }

  get confirmPassword() {
    return this.secondRegisterFormGroup.controls.confirmPassword as FormControl;
  }

  get nameControl(): FormControl {
    return this.firstRegisterFormGroup.controls.name as FormControl;
  }

  get occupationControl(): FormControl {
    return this.firstRegisterFormGroup.controls.occupation as FormControl;
  }

  login() {
    this.firebase.signInWithEmailAndPassword(this.loginEmail.value, this.loginPassword.value).subscribe(() => this.router.navigate(['/home']));
  }

  register() {
    this.firebase.registerUser({
      name: this.nameControl.value,
      occupation: this.occupationControl.value,
      email: this.registerEmail.value,
      password: this.registerPassword.value,
    }).subscribe(() => this.router.navigate(['/home']));
  }
}
