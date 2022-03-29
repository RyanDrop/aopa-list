import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { CustomValidators } from '@aopa/validators';
import { FirebaseService } from 'app/shared/services/firebase/firebase.service';
import { base64ToFile, ImageCroppedEvent } from 'ngx-image-cropper';




@Component({
  selector: 'aopa-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {
  loginFormGroup: FormGroup;
  firstRegisterFormGroup: FormGroup;
  secondRegisterFormGroup: FormGroup;
  profileImage: FormControl;
  fileName: string;


  constructor(
    private firebase: FirebaseService,
    private readonly router: Router,
    private changeDetector: ChangeDetectorRef,
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

    this.profileImage = new FormControl(null, [
      Validators.required,
    ])
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

  onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const files: FileList = target.files as FileList;
    this.imageChangedEvent = event;

    if (files && files.length) {
      const file = files[0];
      this.fileName = file.name;
      this.profileImage.setValue(file);
      this.changeDetector.markForCheck();
    }
  }

  imageChangedEvent: Event;
  croppedImage: any;
  showCropper = false;

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    if (this.croppedImage) {
      this.profileImage.setValue(base64ToFile(this.croppedImage));
    }

  }
  imageLoaded() {
    this.showCropper = true;
  }
  loadImageFailed() {
    alert('Could not load the image');
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
      file: this.profileImage.value,
    }).subscribe(() => this.router.navigate(['/home']));
  }
}
