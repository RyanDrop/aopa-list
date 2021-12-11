import profileTemplate from "./profile.component.html";
import profileStyle from "./profile.component.scss";
import defaultProfileImage from "../../assets/images/profile.png";

export class ProfileComponent extends HTMLElement {
  constructor() {
    super();
  }

  private $defaultProfileImage: HTMLImageElement;

  connectedCallback(): void {
    const style = profileStyle;
    this.innerHTML = profileTemplate;
    this.$defaultProfileImage = this.querySelector(".profile-img img");
    this.$defaultProfileImage.src = defaultProfileImage;
  }
}
customElements.define("aopa-profile", ProfileComponent);
