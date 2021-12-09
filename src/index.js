import { ROUTES } from "./constants/routes.js";
class SinglePageApplication {
  constructor() {
    this.$main = document.querySelector("#root");
  }

  addHashListener() {
    window.addEventListener("hashchange", this.renderPage.bind(this));
  }

  getTargetRoute(hash) {
    return hash === "" ? "home" : hash.replace("#", "");
  }

  async renderPage() {
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

  windowLoadListener() {
    window.addEventListener("load", async () => {
      await this.renderPage();
      this.addHashListener();
    });
  }
}

const app = new SinglePageApplication();
app.addHashListener();
app.windowLoadListener();
