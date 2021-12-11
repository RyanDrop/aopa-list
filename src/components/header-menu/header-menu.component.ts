import headerMenuTemplate from "./header-menu.component.html";
import headerMenuStyle from "./header-menu.component.scss";
import helpIconPath from "../../assets/icons/help.svg";
import configIconPath from "../../assets/icons/settings.svg";

export class HeaderMenuComponent extends HTMLElement {
  constructor() {
    super();
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
  }
}
customElements.define("aopa-header-menu", HeaderMenuComponent);
