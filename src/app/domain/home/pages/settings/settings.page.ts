import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { FADE_IN_OUT } from '@aopa/shared';
import { CustomValidators } from '@aopa/validators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FirebaseService } from 'app/shared/services/firebase/firebase.service';
import { AopaUser } from 'app/shared/services/firebase/firebase.service.models';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { OutsideElements } from '../../components/edit-in-place/edit-in-place.component';
import { LoginDialogComponent } from '../../components/login-dialog/login-dialog.component';


@Component({
  selector: 'aopa-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  animations: [FADE_IN_OUT],
})
@UntilDestroy()
export class SettingsPage implements OnInit {
  submitted = false;
  editInPlaceOutsideElements: OutsideElements = {
    hasAttribute: ($element: HTMLElement) =>
      $element.hasAttribute('mat-raised-button'),
    textContent: ($element: HTMLElement) => $element.textContent === ' Save ',
  };
  editInPlaceIgnoreElements: Array<string> = [
    'INPUT',
    'DIV',
    'BUTTON',
    'TD',
    'SPAN',
    'svg',
    'path',
  ];
  darkThemePreference: boolean;
  phrasePreference: boolean;
  isEditing: boolean;
  settingsForm: FormGroup;
  matcher = new ErrorStateMatcher();

  constructor(private firebase: FirebaseService, private dialog: MatDialog, private auth: Auth, private route: Router) { }

  get nameControl(): FormControl {
    return this.settingsForm.controls.name as FormControl;
  }

  get emailControl(): FormControl {
    return this.settingsForm.controls.email as FormControl;
  }

  get birthdayControl(): FormControl {
    return this.settingsForm.controls.birthday as FormControl;
  }

  get genderControl(): FormControl {
    return this.settingsForm.controls.gender as FormControl;
  }

  get occupationControl(): FormControl {
    return this.settingsForm.controls.occupation as FormControl;
  }

  ngOnInit(): void {
    const aopaUser = from(this.firebase.getUser())
    aopaUser.pipe(untilDestroyed(this)).subscribe((aopa) => {
      const name = aopa.user.name;
      const email = this.auth.currentUser!.email
      const occupation = aopa.user.occupation;
      this.darkThemePreference = aopa.user.darkThemePreference;
      this.phrasePreference = aopa.user.phrasePreference;
      this.createForm(name, email, occupation);
      this.toggleDarkMode();
    });

  }

  private createForm(
    userName: string,
    userEmail: string | null,
    userOccupation: string
  ) {
    this.settingsForm = new FormGroup({
      name: new FormControl(userName, [
        Validators.required,
        CustomValidators.personName,
      ]),
      email: new FormControl(userEmail, [
        Validators.required,
        Validators.email,
      ]),
      occupation: new FormControl(userOccupation, [Validators.required]),
    });
  }

  toggleDarkMode() {
    const $html = document.documentElement;
    $html.classList.remove('dark-mode');
    if (this.darkThemePreference) $html.classList.add('dark-mode');
  }

  updateIsEditing(event: string) {
    this.isEditing = event === 'edit';
    this.submitted = false;
  }

  logoff() {
    this.firebase.logoff().subscribe(() => {
      this.route.navigate(['/auth']);
      document.documentElement.classList.remove('dark-mode');
    });
  }

  submitForm() {
    if (!this.settingsForm.valid) return;
    const formValue = this.settingsForm.value;
    if (formValue.email) return this.updateEmail(formValue);
    this.updateUser(formValue);
  }

  updateEmail(formValue: AopaUser) {
    const dialogRef = this.dialog.open(LoginDialogComponent);
    dialogRef
      .afterClosed()
      .pipe(
        untilDestroyed(this),
        switchMap((event: any) => {
          return from(
            this.firebase.updateEmail(
              event.email,
              event.password,
              formValue.email
            )
          );
        })
      )
      .subscribe(() => {
        this.updateUser(formValue);
      });
  }

  updateUser(formValue: AopaUser) {
    this.firebase.updateUser(formValue);
    this.submitted = true;

  }

  updatePreference(event: MatSlideToggleChange) {
    const dataTestID =
      event.source._elementRef.nativeElement.attributes[1].value;
    const preference =
      dataTestID === 'dark-mode-button'
        ? 'darkThemePreference'
        : 'phrasePreference';
    this[preference] = event.checked;
    this.toggleDarkMode();
    this.firebase.updateUser({ [preference]: event.checked });
  }
}
