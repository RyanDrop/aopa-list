import { WelcomeCardComponent } from "../../components/welcome-card/welcome-card.component";
import { LogFormComponent } from "../../components/log-form/log-form.component";
const declarations = [WelcomeCardComponent, LogFormComponent];

export async function Log(): Promise<HTMLDivElement> {
  const $log = document.createElement("div");
  $log.classList.add("container-log");

  const $welcome = document.createElement("aopa-welcome-card");

  $welcome.addEventListener("load-log-form", () => {
    const $logForm = document.createElement("aopa-log-form");
    $welcome.remove();
    $log.appendChild($logForm);
  });

  $log.appendChild($welcome);

  return $log;
}
