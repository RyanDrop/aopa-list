import logoPath from "../../assets/images/list.png";
import logFormTemplate from "./log-form.component.html";
import logFormStyles from "./log-form.component.scss";

export class LogFormComponent extends HTMLElement {
  constructor() {
    super();
  }
  private $tabRegister: HTMLDivElement;
  private $tabLogin: HTMLDivElement;
  private $aLogin: HTMLAnchorElement;
  private $log: HTMLImageElement;
  private $aRegister: HTMLAnchorElement;
  private $cardLog: HTMLDivElement;

  connectedCallback(): void {
    const style = logFormStyles;
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
}
customElements.define("aopa-log-form", LogFormComponent);
