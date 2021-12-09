import profileTemplate from "./profile.component.html";
import profileStyle from "./profile.component.scss";

export class ProfileComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const style = profileStyle;
    this.innerHTML = profileTemplate;
    const img = this.querySelector(".profile-img img");
    img.src = this.attributes.path.value;
    this.removeAttribute("path");
  }
}
customElements.define("profile-component", ProfileComponent);
