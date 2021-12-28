import { FirebaseServices } from "../../services/firebase.service";
import headerMenuTemplate from "./header-menu.component.html";
import headerMenuStyle from "./header-menu.component.scss";

interface MenuTemplate {
  linkLeftAndClass: string;
  linkRight: string | void;
  iconLeftSrc: string;
  iconRightSrc: string;
  rightClass: string;
}

export class HeaderMenuComponent extends HTMLElement {
  private _firebaseServices: FirebaseServices;
  private customStyle = headerMenuStyle;

  constructor() {
    super();
  }

  set firebaseService(firebaseServices: FirebaseServices) {
    this._firebaseServices = firebaseServices;
  }

  set menu(menu: MenuTemplate) {
    this.innerHTML = this.bindModelToView(menu, headerMenuTemplate);
  }

  connectedCallback(): void {}

  bindModelToView(object: MenuTemplate, template: string) {
    const objectEntries = Object.entries(object);
    const renderedTemplate = objectEntries.reduce((template, [key, value]) => {
      const expression = new RegExp(`{{ *${key}* }}`, "g");
      const replacedTemplate = template.replace(expression, value ?? "");
      return replacedTemplate;
    }, template);

    return renderedTemplate;
  }
}
customElements.define("aopa-header-menu", HeaderMenuComponent);
