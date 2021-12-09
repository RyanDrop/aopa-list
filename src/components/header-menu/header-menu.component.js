import headerMenuTemplate from "./header-menu.component.html";
import headerMenuStyle from "./header-menu.component.scss";

export class HeaderMenuComponent extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const style = headerMenuStyle;
    this.innerHTML = headerMenuTemplate;
    const configIcon = this.querySelector(".config-icon");
    const helpIcon = this.querySelector(".help-icon");
    configIcon.src = this.attributes.configIcon.value;
    helpIcon.src = this.attributes.helpIcon.value;
    this.removeAttribute("configIcon");
    this.removeAttribute("helpIcon");
  }
}
customElements.define("header-menu-component", HeaderMenuComponent);
