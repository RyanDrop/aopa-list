import { HeaderMenuComponent } from "../../components/header-menu/header-menu.component";
import { ProfileComponent } from "../../components/profile/profile.component";
import HomePageStyle from "./home.page.scss";

export async function Home(): Promise<HTMLElement> {
  const $home = document.createElement("aopa-home-page");
  return $home;
}

export class HomePage extends HTMLElement {
  private declarations = [HeaderMenuComponent, ProfileComponent];
  private customStyle = HomePageStyle;
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = `
   <header>
    <aopa-header-menu></aopa-header-menu>
    <aopa-profile></aopa-profile>
   </header>
   `;
  }
}
customElements.define("aopa-home-page", HomePage);
