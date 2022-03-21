import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { AOPA_TEST_USER } from '@aopa/mocks';
import { AopaUser, FirebaseService, UserDetails } from '@aopa/services';
import { FADE_IN_OUT } from '@aopa/shared';
import { CustomValidators } from '@aopa/validators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { from } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
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
  readonly START_DATE = new Date('01/01/2010');

  constructor(private firebase: FirebaseService, private dialog: MatDialog) {}

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
    this.firebase.hasLogin();
    this.firebase.hasUser$
      .pipe(take(1), untilDestroyed(this))
      .subscribe((boolean) => {
        if (boolean) return;
        this.firebase.login(AOPA_TEST_USER.email, AOPA_TEST_USER.password);
      });

    this.firebase.user$
      .pipe(take(1), untilDestroyed(this))
      .subscribe((details: UserDetails) => {
        const name = details.user.name;
        const email = details.firebaseUser.email as string;
        const occupation = details.user.occupation;
        this.darkThemePreference = details.user.darkThemePreference;
        this.phrasePreference = details.user.phrasePreference;
        this.createForm(name, email, occupation);
        this.toggleDarkMode();
      });
  }

  availableDatesFn = (date: Date | null): boolean => {
    const minimumYear = this.START_DATE.getFullYear();
    const currentYear = date?.getFullYear() ?? 0;
    return currentYear <= minimumYear;
  };

  private createForm(
    userName: string,
    userEmail: string,
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
    this.firebase.logout();
    this.firebase.logout$.pipe(take(1), untilDestroyed(this)).subscribe(() => {
      setTimeout(() => (window.location.href = ''), 600);
    });
  }

  submitForm() {
    if (!this.settingsForm.valid) return;
    const formValue = this.settingsForm.value;
    formValue.birthday = formValue.birthday.toISOString();
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
    this.settingsForm.reset();
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
