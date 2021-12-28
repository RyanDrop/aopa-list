import { User } from "firebase/auth";
import circleCheckIconPath from "../../assets/icons/circle-check.svg";
import circleXIconPath from "../../assets/icons/circle-xmark.svg";
import moonIconPath from "../../assets/icons/moon.svg";
import sunIconPath from "../../assets/icons/sun.svg";
import { FirebaseServices } from "../../services/firebase.service";
import changeFormTemplate from "./change-form.component.html";
import changeFormStyle from "./change-form.component.scss";

export class ChangeFormComponent extends HTMLElement {
  public customStyle = changeFormStyle;
  private _firebaseServices: FirebaseServices;
  constructor() {
    super();
  }

  private $buttonUpdateUser: HTMLButtonElement;
  private $moonIcon: HTMLImageElement;
  private $sunIcon: HTMLImageElement;
  private $circleCheckIcon: HTMLImageElement;
  private $circleXIcon: HTMLImageElement;

  set firebaseServices(firebaseServices: FirebaseServices) {
    this._firebaseServices = firebaseServices;
  }
  set user(user: User) {
    this.innerHTML = this.bindModelToView(user, changeFormTemplate);
  }

  connectedCallback(): void {
    this.$moonIcon = this.querySelector(".moon-icon");
    this.$sunIcon = this.querySelector(".sun-icon");
    this.$circleCheckIcon = this.querySelector(".times-circle-icon");
    this.$circleXIcon = this.querySelector(".check-circle-icon");
    this.$moonIcon.src = moonIconPath;
    this.$sunIcon.src = sunIconPath;
    this.$circleCheckIcon.src = circleCheckIconPath;
    this.$circleXIcon.src = circleXIconPath;
    this.$buttonUpdateUser = this.querySelector(".update-user");

    const $eventUpdate = new Event("load-update-user");
    this.$buttonUpdateUser.addEventListener("click", () => this.dispatchEvent($eventUpdate));
  }

  bindModelToView(object: User, template: string) {
    const objectEntries = Object.entries(object);
    const renderedTemplate = objectEntries.reduce((template, [key, value]) => {
      const expression = new RegExp(`{{ *${key}* }}`, "g");
      const replacedTemplate = template.replace(expression, value ?? "");
      return replacedTemplate;
    }, template);

    return renderedTemplate;
  }
}
customElements.define("aopa-change-form", ChangeFormComponent);
