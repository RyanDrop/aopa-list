import { eValidationErrorMessage } from '@aopa/directives';
import { AOPA_TEST_USER } from '@aopa/mocks';

const getDarkModeButton = () => cy.get('[data-testid=dark-mode-button]');
const getNameViewInput = () => cy.get('[data-testid=name-view-input]');
const getNameInput = () => cy.get('[data-testid=name-input]');
const getEmailViewInput = () => cy.get('[data-testid=email-view-input]');
const getEmailInput = () => cy.get('[data-testid=email-input]');
const getForm = () => cy.get('[data-testid=form-group]');
const getSubmitButton = () => cy.get('[data-testid=submit-form-button]');
const getMatError = () => cy.get('[data-testid=mat-error]');
const getGenderViewInput = () => cy.get('[data-testid=gender-view-input]');
const getGenderInput = () => cy.get('[data-testid=gender-input]');
const getBirthdayViewInput = () => cy.get('[data-testid=birthday-view-input]');
const getBirthdayInput = () => cy.get('[data-testid=birthday-input]');
const getDateError = () => cy.get('[data-testid=birthday-error]');
const getDialogLoginInput = () => cy.get('[data-testid=dialog-login-input]');
const getDialogPasswordInput = () =>
  cy.get('[data-testid=dialog-login-password]');
const getDialogSubmitButton = () =>
  cy.get('[data-testid=dialog-submit-button]');
const getDialogCancelButton = () =>
  cy.get('[data-testid=dialog-cancel-button]');
const getOccupationViewInput = () =>
  cy.get('[data-testid=occupation-view-input]');
const getOccupationInput = () => cy.get('[data-testid=occupation-input]');

interface TesteUser {
  name: string;
  email: string;
  birthday: string;
  occupation: string;
  gender: string;
  password: string;
}

const nameView = '[data-testid=name-form-view-input]';
const nameForm = '[data-testid=name-form-input]';
const emailForm = '[data-testid=email-form-input]';
const emailView = '[data-testid=email-form-view-input]';
const genderView = '[data-testid=gender-form-view-input]';
const occupationView = '[data-testid=occupation-form-view-input]';
const occupationForm = '[data-testid=occupation-form-input]';
const maleGenderOption = '[data-testid=male-option]';
const birthdayForm = '[data-testid=birthday-form-input]';
const birthdayView = '[data-testid=birthday-form-view-input]';
const timer = 2000;
const loginInput = '[data-testid=dialog-email-input]';
const passwordInput = '[data-testid=dialog-password-input]';

const updatedAndVerifyUser = (updatedUser: TesteUser, authUser: TesteUser) => {
  getNameViewInput().click();
  getNameInput().get(nameForm).clear().type(updatedUser.name);

  getOccupationViewInput().click();
  getOccupationInput().get(occupationForm).clear().type(updatedUser.occupation);

  getEmailViewInput().click();
  getEmailInput().get(emailForm).clear().type(updatedUser.email);

  getGenderViewInput().click();
  getGenderInput().click().get(maleGenderOption).click();
  cy.get('[data-testid=editing-container]').click();

  getBirthdayViewInput().click();
  getBirthdayInput().get(birthdayForm).clear().type(updatedUser.birthday);

  getSubmitButton().click();

  getDialogLoginInput().get(loginInput).type(authUser.email);
  getDialogPasswordInput().get(passwordInput).type(authUser.password);
  getDialogSubmitButton().click();

  cy.wait(timer);
  cy.reload();

  getNameViewInput()
    .get<HTMLInputElement>(nameView)
    .then(([$nameViewInput]) => {
      const value = $nameViewInput.value;
      expect(value).to.be.equal(updatedUser.name);
    });

  getOccupationViewInput()
    .get<HTMLInputElement>(occupationView)
    .then(([$occupationViewInput]) => {
      const value = $occupationViewInput.value;
      expect(value).to.be.equal(updatedUser.occupation);
    });

  getEmailViewInput()
    .get<HTMLInputElement>(emailView)
    .then(([$emailViewInput]) => {
      const value = $emailViewInput.value;
      expect(value).to.be.equal(updatedUser.email);
    });

  getGenderViewInput()
    .get<HTMLInputElement>(genderView)
    .then(([$genderViewInput]) => {
      const value = $genderViewInput.value;
      expect(value).to.be.equal(updatedUser.gender);
    });

  getBirthdayViewInput()
    .get<HTMLInputElement>(birthdayView)
    .then(([$birthdayViewInput]) => {
      const value = $birthdayViewInput.value;
      expect(value).to.be.equal(updatedUser.birthday);
    });
};

describe('SettingsPage', () => {
  beforeEach(() => {
    cy.visit('/settings');
  });

  it('should switch theme when click on dark mode toggle button', () => {
    getDarkModeButton().click();
    cy.get('html').should('have.class', 'dark-mode');
    getDarkModeButton().click();
  });

  it('should show error when name is invalid', () => {
    getNameViewInput().click();
    getNameInput().get(nameForm).clear().type('a');
    getForm().click();
    getMatError().then(([$matError]) => {
      const errorMessage = $matError.innerHTML;
      expect(errorMessage).to.be.equal(eValidationErrorMessage.NAME);
    });
  });

  it('should show error required when name is empty', () => {
    getNameViewInput().click();
    getNameInput().get(nameForm).clear();
    getForm().click();

    getMatError().then(([$matError]) => {
      const errorMessage = $matError.innerHTML;
      expect(errorMessage).to.be.equal(eValidationErrorMessage.REQUIRED);
    });
  });

  it('should show error when email is invalid', () => {
    getEmailViewInput().click();
    getEmailInput().get(emailForm).clear().type('teste');
    getForm().click();

    getMatError().then(([$matError]) => {
      const errorMessage = $matError.innerHTML;
      expect(errorMessage).to.be.equal(eValidationErrorMessage.EMAIL);
    });
  });

  it('should show error required when email is empty', () => {
    getEmailViewInput().click();
    getEmailInput().get(emailForm).clear();
    getForm().click();

    getMatError().then(([$matError]) => {
      const errorMessage = $matError.innerHTML;
      expect(errorMessage).to.be.equal(eValidationErrorMessage.REQUIRED);
    });
  });

  it('should display error when user selects a date outside the allowed limit', () => {
    getBirthdayViewInput().click();
    getBirthdayInput().get(birthdayForm).clear().type('01/01/2050');
    getForm().click();

    getDateError().then(([$matError]) => {
      const errorMessage = $matError.innerHTML;
      expect(errorMessage).to.be.equal(
        eValidationErrorMessage.MAT_DATEPICKER_FILTER
      );
    });
  });

  it('should show error required when date is empty', () => {
    getBirthdayViewInput().click();
    getBirthdayInput().get(birthdayForm).clear();
    getForm().click();

    getDateError().then(([$matError]) => {
      const errorMessage = $matError.innerHTML;
      expect(errorMessage).to.be.equal(eValidationErrorMessage.REQUIRED);
    });
  });

  it('should update user', () => {
    const UPDATED_USER = {
      name: 'João Vitor Pereira dos Santos',
      email: 'joaovitorswdota2@gmail.com',
      birthday: '09/24/2001',
      occupation: 'FrontEnd Developer',
      gender: 'Male',
      password: '123456',
    };

    updatedAndVerifyUser(UPDATED_USER, AOPA_TEST_USER);
    updatedAndVerifyUser(AOPA_TEST_USER, UPDATED_USER);
  });
});
