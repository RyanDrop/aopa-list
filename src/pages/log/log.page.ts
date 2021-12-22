import { LogFormComponent } from "../../components/log-form/log-form.component";
import { WelcomeCardComponent } from "../../components/welcome-card/welcome-card.component";
import { FirebaseServices } from "../../services/firebase.service";
import LogPageStyles from "./log.page.scss";

export async function Log(): Promise<HTMLElement> {
  const $log = document.createElement("aopa-log-page");
  return $log;
}

export class LogPage extends HTMLElement {
  private _firebaseServices: FirebaseServices;
  private customStyle = LogPageStyles;
  private declarations = [WelcomeCardComponent, LogFormComponent];

  set firebaseServices(firebaseServices: FirebaseServices) {
    this._firebaseServices = firebaseServices;
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this._firebaseServices.user$.subscribe((hasUser) => {
      if (hasUser) window.location.href = "/?#home";
    });
    const $welcome = document.createElement("aopa-welcome-card");
    $welcome.addEventListener("load-log-form", () => {
      const $logForm = document.createElement("aopa-log-form") as LogFormComponent;
      $logForm.firebaseServices = this._firebaseServices;
      $welcome.remove();
      this.appendChild($logForm);
    });
    this.appendChild($welcome);
  }
}
customElements.define("aopa-log-page", LogPage);
