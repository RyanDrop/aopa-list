import { Home } from "../pages/home/home.page";
import { Log } from "../pages/log/log.page";
import { Settings } from "../pages/settings/settings.page";

interface IRoute {
  home: Function;
  log: Function;
  settings: Function;
}

export const ROUTES: IRoute = {
  home: Home,
  log: Log,
  settings: Settings,
};
