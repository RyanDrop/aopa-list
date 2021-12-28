import defaultProfileImage from "../../assets/images/profile.png";
import profileTemplate from "./profile.component.html";
import profileStyle from "./profile.component.scss";
interface ProfileTemplate {
  name: string;
  occupation: string;
}
export class ProfileComponent extends HTMLElement {
  private customStyle = profileStyle;
  constructor() {
    super();
  }

  private $defaultProfileImage: HTMLImageElement;

  set user(user: ProfileTemplate) {
    this.innerHTML = this.bindModelToView(user, profileTemplate);
    this.$defaultProfileImage = this.querySelector(".profile-img img");
    this.$defaultProfileImage.src = defaultProfileImage;
  }

  connectedCallback(): void {}

  bindModelToView(object: ProfileTemplate, template: string) {
    const objectEntries = Object.entries(object);
    const renderedTemplate = objectEntries.reduce((template, [key, value]) => {
      const expression = new RegExp(`{{ *${key}* }}`, "g");
      const replacedTemplate = template.replace(expression, value ?? "");
      return replacedTemplate;
    }, template);

    return renderedTemplate;
  }
}

customElements.define("aopa-profile", ProfileComponent);
