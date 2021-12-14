import { WelcomeCardComponent } from "../../components/welcome-card/welcome-card.component";
import { LogFormComponent } from "../../components/log-form/log-form.component";
import LogPageStyles from "./log.page.scss";

export async function Log(): Promise<HTMLElement> {
  const $log = document.createElement("aopa-log-page");
  return $log;
}

export class LogPage extends HTMLElement {
  private customStyle = LogPageStyles;
  private declarations = [WelcomeCardComponent, LogFormComponent];
  constructor() {
    super();
  }

  connectedCallback() {
    const $welcome = document.createElement("aopa-welcome-card");

    $welcome.addEventListener("load-log-form", () => {
      const $logForm = document.createElement("aopa-log-form");
      $welcome.remove();
      this.appendChild($logForm);
    });

    this.appendChild($welcome);
  }
}
customElements.define("aopa-log-page", LogPage);
