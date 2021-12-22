import { HeaderMenuComponent } from "../../components/header-menu/header-menu.component";
import { LoadingComponent } from "../../components/loading/loading.component";
import { ProfileComponent } from "../../components/profile/profile.component";
import { FirebaseServices } from "../../services/firebase.service";
import HomePageStyle from "./home.page.scss";

export async function Home(): Promise<HTMLElement> {
  const $home = document.createElement("aopa-home-page");
  return $home;
}

export class HomePage extends HTMLElement {
  private declarations = [HeaderMenuComponent, ProfileComponent, LoadingComponent];
  private customStyle = HomePageStyle;
  private _firebaseServices: FirebaseServices;

  set firebaseServices(firebaseServices: FirebaseServices) {
    this._firebaseServices = firebaseServices;
  }
  constructor() {
    super();
  }
  connectedCallback() {
    const $profile = document.createElement("aopa-profile") as ProfileComponent;
    const $header = document.createElement("header");
    const $headerMenu = document.createElement("aopa-header-menu") as HeaderMenuComponent;

    this._firebaseServices.user$.subscribe(({ personal_information }) => {
      if (!personal_information) window.location.href = "/?#log";
      const { name, occupation } = personal_information;
      $headerMenu.firebaseService = this._firebaseServices;

      $profile.user = { name, occupation };
      $header.appendChild($headerMenu);
      $header.appendChild($profile);
      this.appendChild($header);
    });
  }
}
customElements.define("aopa-home-page", HomePage);
