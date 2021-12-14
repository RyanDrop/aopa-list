import { Home } from "../pages/home/home.page";
import { Log } from "../pages/log/log.page";

interface IRoute {
  home: Function;
  log: Function;
}

export const ROUTES: IRoute = {
  home: Home,
  log: Log,
};
