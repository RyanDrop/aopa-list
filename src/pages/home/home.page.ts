import { HeaderMenuComponent } from "../../components/header-menu/header-menu.component";
import { ProfileComponent } from "../../components/profile/profile.component";
import { FirebaseServices } from "../../services/firebase.service";
import HomePageStyle from "./home.page.scss";

export async function Home(): Promise<HTMLElement> {
  const $home = document.createElement("aopa-home-page");
  return $home;
}

export class HomePage extends HTMLElement {
  private declarations = [HeaderMenuComponent, ProfileComponent];
  private customStyle = HomePageStyle;
  private firebaseServices: FirebaseServices;
  constructor() {
    super();
    this.firebaseServices = new FirebaseServices();
  }
  connectedCallback() {
    this.innerHTML = `
   <header>
    <aopa-header-menu></aopa-header-menu>
    <aopa-profile></aopa-profile>
   </header>
   `;
    const $profile: ProfileComponent = this.querySelector("aopa-profile");

    this.firebaseServices.user$.subscribe(({ personal_information }) => {
      const { name, occupation } = personal_information;
      $profile.user = { name, occupation };
    });
  }
}
customElements.define("aopa-home-page", HomePage);
