import welcomeCardTemplate from "./welcome-card.component.html";
import welcomeCardStyle from "./welcome-card.component.scss";
import logoPath from "../../assets/images/list.png";

export class WelcomeCardComponent extends HTMLElement {
  constructor() {
    super();
  }

  private $buttonLog: HTMLButtonElement;
  private $logo: HTMLImageElement;

  connectedCallback(): void {
    const style = welcomeCardStyle;
    this.innerHTML = welcomeCardTemplate;

    this.$logo = this.querySelector(".logo");
    this.$logo.src = logoPath;

    this.$buttonLog = this.querySelector(".log");

    this.$buttonLog.addEventListener("click", () => {
      const $event = new Event("load-log-form");
      this.dispatchEvent($event);
    });
  }
}

customElements.define("aopa-welcome-card", WelcomeCardComponent);
