import { LogFormComponent } from "../../components/log-form/log-form.component";
import { WelcomeCardComponent } from "../../components/welcome-card/welcome-card.component";
import { FirebaseServices } from "../../services/firebase.service";
import LogPageStyles from "./log.page.scss";

export async function Log(): Promise<HTMLElement> {
  const $log = document.createElement("aopa-log-page");
  return $log;
}

export class LogPage extends HTMLElement {
  private firebaseServices: FirebaseServices;
  private customStyle = LogPageStyles;
  private declarations = [WelcomeCardComponent, LogFormComponent];
  constructor() {
    super();
    this.firebaseServices = new FirebaseServices();
    this.firebaseServices.hasLogin$.subscribe((hasUser) => {
      if (hasUser) window.location.href = "/?#home";
    });
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
