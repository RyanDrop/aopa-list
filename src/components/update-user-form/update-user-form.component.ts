import updateUserFormTemplate from "./update-user-form.component.html";
import updateUserFormStyles from "./update-user-form.component.scss";

export class UpdateUserFormComponent extends HTMLElement {
  private customStyle = updateUserFormStyles;
  constructor() {
    super();
  }

  $buttonUpdateCancel: HTMLButtonElement;

  connectedCallback() {
    this.innerHTML = updateUserFormTemplate;
    this.$buttonUpdateCancel = this.querySelector(".update-cancel");
    this.$buttonUpdateCancel.addEventListener("click", () => this.remove());
  }
}
customElements.define("aopa-update-user-form", UpdateUserFormComponent);
