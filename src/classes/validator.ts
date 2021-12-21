export class Validators {
  public name: boolean;
  public occupation: boolean;
  public email: boolean;
  public password: boolean;
  public passwordMatch: boolean;
  constructor() {
    this.name = false;
    this.occupation = false;
    this.email = false;
    this.password = false;
    this.passwordMatch = false;
  }

  isValidName(value: string) {
    const namePattern = /^[a-z\u00C0-\u00ff A-Z.\s]{3,15}$/;
    const isValid = namePattern.test(value);
    this.name = isValid;
  }

  isValidOccupation(value: string) {
    const occupationPattern = /^[A-zÀ-ú0-9.\s]{3,30}$/;
    const isValid = occupationPattern.test(value);
    this.occupation = isValid;
  }

  isValidEmail(value: string) {
    const emailPattern = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const isValid = emailPattern.test(value);
    this.email = isValid;
  }

  isValidPassword(value: string) {
    const passwordPattern = /[A-Za-z0-9!@#$%^&*]{6,20}$/;
    const isValid = passwordPattern.test(value);
    this.password = isValid;
  }

  passwordIsMatch(previousValue: string, currentValue: string) {
    const isValid = previousValue === currentValue;
    this.passwordMatch = isValid;
  }

  registerIsValidAllProperties() {
    const validRegister = this.name && this.occupation && this.email && this.password && this.passwordMatch;
    return validRegister;
  }

  loginIsValidAllProperties() {
    const validLogin = this.email && this.password;
    return validLogin;
  }
}
