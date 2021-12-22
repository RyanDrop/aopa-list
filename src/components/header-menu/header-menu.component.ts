import helpIconPath from "../../assets/icons/help.svg";
import configIconPath from "../../assets/icons/settings.svg";
import { FirebaseServices } from "../../services/firebase.service";
import headerMenuTemplate from "./header-menu.component.html";
import headerMenuStyle from "./header-menu.component.scss";

export class HeaderMenuComponent extends HTMLElement {
  private customStyle = headerMenuStyle;
  private _firebaseServices: FirebaseServices;
  constructor() {
    super();
  }

  set firebaseService(firebaseServices: FirebaseServices) {
    this._firebaseServices = firebaseServices;
  }
  private $configIcon: HTMLImageElement;
  private $helpIcon: HTMLImageElement;

  connectedCallback(): void {
    this.innerHTML = headerMenuTemplate;
    this.$configIcon = this.querySelector(".config-icon");
    this.$helpIcon = this.querySelector(".help-icon");
    this.$configIcon.src = configIconPath;
    this.$helpIcon.src = helpIconPath;

    this.$configIcon.addEventListener("click", () => {
      this._firebaseServices.logout();
      window.location.href = "/?#log";
    });
  }
}
customElements.define("aopa-header-menu", HeaderMenuComponent);
