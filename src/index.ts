import { ROUTES } from "./constants/routes.js";
class SinglePageApplication {
  private $main: HTMLElement;
  constructor() {
    this.$main = document.querySelector("#root");
  }

  addHashListener(): void {
    window.addEventListener("hashchange", this.renderPage.bind(this));
  }

  getTargetRoute(hash: string): string {
    return hash === "" ? "home" : hash.replace("#", "");
  }

  async renderPage(): Promise<void> {
    this.$main.innerHTML = "";
    const hashedRoute = window.location.hash;
    const targetRoute = this.getTargetRoute(hashedRoute);
    const [fragment, param] = targetRoute.split("/");

    const renderPageFn = ROUTES[fragment];
    const hasParam = !!param;
    const html = hasParam ? await renderPageFn(param) : await renderPageFn();
    this.$main.appendChild(html);
    // this.addonsPage(fragment);
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
