import { HeaderMenuComponent } from "../../components/header-menu/header-menu.component";
import { ProfileComponent } from "../../components/profile/profile.component";
const declarations = [HeaderMenuComponent, ProfileComponent];

export async function Home(): Promise<HTMLDivElement> {
  const $home = document.createElement("div");
  $home.classList.add("container");

  $home.innerHTML = `
   <header>
    <aopa-header-menu></aopa-header-menu>
    <aopa-profile></aopa-profile>
   </header>
   `;

  return $home;
}
