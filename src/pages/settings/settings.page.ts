import homeImage from "../../assets/icons/home.svg";
import signOutImage from "../../assets/icons/sign-out.svg";
import { ChangeFormComponent } from "../../components/change-form/change-form.component";
import { HeaderMenuComponent } from "../../components/header-menu/header-menu.component";
import { UpdateUserFormComponent } from "../../components/update-user-form/update-user-form.component";
import { FirebaseServices } from "../../services/firebase.service";
import { UtilsService } from "../../services/utils.service";
import SettingsStyle from "./settings.page.scss";

export async function Settings(): Promise<HTMLElement> {
  const $settings = document.createElement("aopa-settings-page");
  return $settings;
}

export class SettingsPage extends HTMLElement {
  private customStyle = SettingsStyle;
  private declarations = [HeaderMenuComponent, ChangeFormComponent, UpdateUserFormComponent];
  private _firebaseServices: FirebaseServices;
  $singOut: HTMLDivElement;
  set firebaseServices(firebaseServices: FirebaseServices) {
    this._firebaseServices = firebaseServices;
  }
  constructor() {
    super();
  }

  connectedCallback() {
    const $headerMenuTemplate = {
      linkLeftAndClass: "home",
      linkRight: this._firebaseServices.logout(),
      iconLeftSrc: homeImage,
      iconRightSrc: signOutImage,
      rightClass: "sign-out",
    };

    const $header = document.createElement("header");
    const $title = UtilsService.createElementWithText("h1", "Settings");
    const $headerMenu = document.createElement("aopa-header-menu") as HeaderMenuComponent;
    const $changeForm = document.createElement("aopa-change-form") as ChangeFormComponent;
    const $updateUserForm = document.createElement("aopa-update-user-form") as UpdateUserFormComponent;

    this._firebaseServices.user$.subscribe(({ personal_information, preferences }) => {
      const { name, occupation, gender, birthday } = personal_information;
      const { dark_mode, phrases_API } = preferences;

      $changeForm.user = { name, occupation, gender, birthday, dark_mode, phrases_API };
      this.appendChild($header);
      $headerMenu.menu = $headerMenuTemplate;
      $header.appendChild($headerMenu);
      $header.appendChild($title);
      this.appendChild($changeForm);
    });

    $changeForm.addEventListener("load-update-user", () => {
      this.appendChild($updateUserForm);
    });
  }
}
customElements.define("aopa-settings-page", SettingsPage);
