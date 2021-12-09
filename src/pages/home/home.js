import { HeaderMenuComponent } from "../../components/header-menu/header-menu.component.js";
import { ProfileComponent } from "../../components/profile/profile.component.js";
import profileImage from "../../assets/images/profile.png";
import configIconPath from "../../assets/icons/settings.svg";
import helpIconPath from "../../assets/icons/help.svg";

export async function Home() {
  const $home = document.createElement("div");
  $home.classList.add("container");
  const declarations = [HeaderMenuComponent, ProfileComponent];

  $home.innerHTML = `
   <header>
    <header-menu-component 
    configIcon="${configIconPath}" helpIcon="${helpIconPath}">
    </header-menu-component>
    <profile-component path="${profileImage}"></profile-component>
   </header>
   `;

  return $home;
}
