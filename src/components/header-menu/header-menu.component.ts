import helpIconPath from "../../assets/icons/help.svg";
import configIconPath from "../../assets/icons/settings.svg";
import { FirebaseServices } from "../../services/firebase.service";
import headerMenuTemplate from "./header-menu.component.html";
import headerMenuStyle from "./header-menu.component.scss";

export class HeaderMenuComponent extends HTMLElement {
  private firebaseServices: FirebaseServices;
  constructor() {
    super();
    this.firebaseServices = new FirebaseServices();
  }
  private $configIcon: HTMLImageElement;
  private $helpIcon: HTMLImageElement;

  connectedCallback(): void {
    const style = headerMenuStyle;
    this.innerHTML = headerMenuTemplate;
    this.$configIcon = this.querySelector(".config-icon");
    this.$helpIcon = this.querySelector(".help-icon");
    this.$configIcon.src = configIconPath;
    this.$helpIcon.src = helpIconPath;
    this.$configIcon.addEventListener("click", () => {
      this.firebaseServices.logout();
      window.location.href = "/?#log";
    });
  }
}
customElements.define("aopa-header-menu", HeaderMenuComponent);
