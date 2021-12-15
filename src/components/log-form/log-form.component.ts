import logoPath from "../../assets/images/list.png";
import logFormTemplate from "./log-form.component.html";
import logFormStyles from "./log-form.component.scss";
import { FirebaseServices } from "../../services/firebase.service";

export class LogFormComponent extends HTMLElement {
  private firebaseServices: FirebaseServices;
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
  private customStyle = logFormStyles;
  constructor() {
    super();
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
    });
    this.$aLogin.addEventListener("click", () => {
      this.tabDisplay(this.$tabRegister, this.$tabLogin);
      this.toggleAttributeElements();
    });

    this.firebaseServices.start();

    this.$nameForm = this.querySelector(".input-name");
    this.$occupationForm = this.querySelector(".input-occupation");
    this.$registerEmail = this.querySelector(".register-email");
    this.$registerPassword = this.querySelector(".register-password");
    this.$mathPassword = this.querySelector(".math-password");
    this.$buttonRegister = this.querySelector(".register-submit");

    this.$buttonRegister.addEventListener("click", () => {
      this.firebaseServices.register(
        this.$registerEmail.value,
        this.$registerPassword.value,
        this.$nameForm.value,
        this.$occupationForm.value
      );
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

  formListeners() {}
}
customElements.define("aopa-log-form", LogFormComponent);
