import welcomeCardTemplate from "./welcome-card.component.html";
import welcomeCardStyle from "./welcome-card.component.scss";
import logoPath from "../../assets/images/list.png";

export class WelcomeCardComponent extends HTMLElement {
  private customStyle = welcomeCardStyle;
  constructor() {
    super();
  }

  private $buttonLog: HTMLButtonElement;
  private $logo: HTMLImageElement;

  connectedCallback(): void {
    this.innerHTML = welcomeCardTemplate;

    this.$logo = this.querySelector(".logo");
    this.$logo.src = logoPath;

    this.$buttonLog = this.querySelector(".log");

    const $event = new Event("load-log-form");
    this.$buttonLog.addEventListener("click", () => this.dispatchEvent($event));
  }
}

customElements.define("aopa-welcome-card", WelcomeCardComponent);
