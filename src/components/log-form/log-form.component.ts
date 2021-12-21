import { Validators } from "../../classes/validator";
import { FirebaseServices } from "../../services/firebase.service";
import { UtilsService } from "../../services/utils.service";
import logoPath from "../../assets/images/list.png";
import logFormTemplate from "./log-form.component.html";
import logFormStyles from "./log-form.component.scss";

export class LogFormComponent extends HTMLElement {
  private firebaseServices: FirebaseServices;
  private validators: Validators;
  private $tabRegister: HTMLDivElement;
  private $tabLogin: HTMLDivElement;
  private $aLogin: HTMLAnchorElement;
  private $log: HTMLImageElement;
  private $aRegister: HTMLAnchorElement;
  private $cardLog: HTMLDivElement;
  private $nameForm: HTMLInputElement;
  private $occupationForm: HTMLInputElement;
  private $registerEmail: HTMLInputElement;
  private $registerPassword: HTMLInputElement;
  private $mathPassword: HTMLInputElement;
  private $buttonRegister: HTMLButtonElement;
  private $loginEmail: HTMLInputElement;
  private $loginPassword: HTMLInputElement;
  private $buttonLogin: HTMLButtonElement;
  private customStyle = logFormStyles;
  constructor() {
    super();
    this.validators = new Validators();
    this.firebaseServices = new FirebaseServices();
  }

  connectedCallback(): void {
    this.innerHTML = logFormTemplate;
    this.$log = this.querySelector(".log");
    this.$log.src = logoPath;
    this.$cardLog = this.querySelector(".card-log");
    this.$aRegister = this.querySelector(".register");
    this.$aLogin = this.querySelector(".login");
    this.$tabRegister = this.querySelector(".tab-register");
    this.$tabLogin = this.querySelector(".tab-login");

    this.$aRegister.addEventListener("click", () => {
      this.tabDisplay(this.$tabLogin, this.$tabRegister);
      this.toggleAttributeElements();
      this.buttonEnable();
    });
    this.$aLogin.addEventListener("click", () => {
      this.tabDisplay(this.$tabRegister, this.$tabLogin);
      this.toggleAttributeElements();
      this.buttonEnable();
    });

    this.$nameForm = this.querySelector(".input-name");
    this.$occupationForm = this.querySelector(".input-occupation");
    this.$registerEmail = this.querySelector(".register-email");
    this.$registerPassword = this.querySelector(".register-password");
    this.$mathPassword = this.querySelector(".match-password");
    this.$buttonRegister = this.querySelector(".register-submit");
    this.$loginEmail = this.querySelector(".login-email");
    this.$loginPassword = this.querySelector(".login-password");
    this.$buttonLogin = this.querySelector(".login-submit");

    this.formListenersRegisterValidate();
    this.$buttonRegister.addEventListener("click", () => {
      this.firebaseServices.register(
        this.$registerEmail.value,
        this.$registerPassword.value,
        this.$nameForm.value,
        this.$occupationForm.value
      );
    });

    this.formListenersLoginValidate();
    this.$buttonLogin.addEventListener("click", () => {
      this.firebaseServices.login(this.$loginEmail.value, this.$loginPassword.value);
    });
  }

  tabDisplay(displayNone: HTMLDivElement, displayFlex: HTMLDivElement): void {
    displayNone.style.display = "none";
    displayFlex.style.display = "flex";
  }

  toggleAttributeElements(): void {
    this.$aLogin.toggleAttribute("active");
    this.$aRegister.toggleAttribute("active");
    this.$cardLog.toggleAttribute("login");
  }

  formListenersRegisterValidate() {
    this.$nameForm.addEventListener("input", () => {
      this.validators.isValidName(this.$nameForm.value);
      UtilsService.elementClassToggleWithCondition(this.$nameForm, "invalid", !this.validators.name);
      this.buttonEnable();
    });
    this.$occupationForm.addEventListener("input", () => {
      this.validators.isValidOccupation(this.$occupationForm.value);
      UtilsService.elementClassToggleWithCondition(this.$occupationForm, "invalid", !this.validators.occupation);
      this.buttonEnable();
    });
    this.$registerEmail.addEventListener("input", () => {
      this.validators.isValidEmail(this.$registerEmail.value);
      UtilsService.elementClassToggleWithCondition(this.$registerEmail, "invalid", !this.validators.email);
      this.buttonEnable();
    });
    this.$registerPassword.addEventListener("input", () => {
      this.validators.isValidPassword(this.$registerPassword.value);
      UtilsService.elementClassToggleWithCondition(this.$registerPassword, "invalid", !this.validators.password);
      this.buttonEnable();
    });
    this.$mathPassword.addEventListener("input", () => {
      this.validators.passwordIsMatch(this.$registerPassword.value, this.$mathPassword.value);
      UtilsService.elementClassToggleWithCondition(this.$mathPassword, "invalid", !this.validators.passwordMatch);
      this.buttonEnable();
    });
  }

  formListenersLoginValidate() {
    this.$loginEmail.addEventListener("input", () => {
      this.validators.isValidEmail(this.$loginEmail.value);
      UtilsService.elementClassToggleWithCondition(this.$loginEmail, "invalid", !this.validators.email);
      this.buttonEnable();
    });
    this.$loginPassword.addEventListener("input", () => {
      this.validators.isValidPassword(this.$loginPassword.value);
      UtilsService.elementClassToggleWithCondition(this.$loginPassword, "invalid", !this.validators.password);
      this.buttonEnable();
    });
  }

  buttonEnable(): void {
    const validLogin = !this.validators.loginIsValidAllProperties();
    const validRegister = !this.validators.registerIsValidAllProperties();
    this.$buttonRegister.disabled = validRegister;
    this.$buttonLogin.disabled = validLogin;
    if (validLogin) this.$buttonLogin.disabled = validLogin;
    if (validRegister) this.$buttonRegister.disabled = validRegister;
  }
}
customElements.define("aopa-log-form", LogFormComponent);
