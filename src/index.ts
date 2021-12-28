import { LoadingComponent } from "./components/loading/loading.component";
import { ROUTES } from "./constants/routes";
import { FirebaseServices } from "./services/firebase.service";
class SinglePageApplication {
  private $loading: HTMLElement;
  private $main: HTMLElement;
  $body: HTMLBodyElement;
  private firebaseServices: FirebaseServices;
  private declarations = [LoadingComponent];
  constructor() {
    this.$body = document.querySelector("body");
    this.$main = document.querySelector("#root");
    this.firebaseServices = new FirebaseServices();

    this.$loading = document.createElement("aopa-loading");
    this.$body.appendChild(this.$loading);
    this.$loading.classList.add("fade-out");
    setTimeout(() => {
      this.$loading.remove();
    }, 2500);
  }

  addHashListener(): void {
    window.addEventListener("hashchange", this.renderPage.bind(this));
  }

  getTargetRoute(hash: string): string {
    return hash === "" ? "log" : hash.replace("#", "");
  }

  async renderPage(): Promise<void> {
    this.$main.innerHTML = "";
    const hashedRoute = window.location.hash;
    const targetRoute = this.getTargetRoute(hashedRoute);
    const [fragment, param] = targetRoute.split("/");
    const renderPageFn = ROUTES[fragment];
    const hasParam = !!param;
    const $html = hasParam ? await renderPageFn(param) : await renderPageFn();
    $html.firebaseServices = this.firebaseServices;
    await this.firebaseServices.hasLogin();
    this.$main.appendChild($html);
  }

  windowLoadListener(): void {
    window.addEventListener("load", async () => {
      await this.renderPage();
      this.addHashListener();
    });
  }
}

const app = new SinglePageApplication();
app.addHashListener();
app.windowLoadListener();

const emptyHash = window.location.hash === "";
const defaultRoute = () => (window.location.href = "?#log");

if (emptyHash) defaultRoute();
