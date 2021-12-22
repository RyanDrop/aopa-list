import logoPath from "../../assets/images/list.png";
import loadingStyle from "./loading.component.scss";

export class LoadingComponent extends HTMLElement {
  private customStyle = loadingStyle;
  constructor() {
    super();
  }

  private $logo: HTMLImageElement;

  connectedCallback() {
    this.$logo = document.createElement("img");
    this.$logo.src = logoPath;
    this.appendChild(this.$logo);
  }
}
customElements.define("aopa-loading", LoadingComponent);
