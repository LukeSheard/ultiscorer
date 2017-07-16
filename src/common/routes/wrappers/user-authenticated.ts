import {
  connectedRouterRedirect,
  createOnEnter
} from "redux-auth-wrapper/history3/redirect";
import { IAppState } from "../../reducers";

const options = {
  authenticatedSelector: (state: IAppState) =>
    state.user && state.user.token !== void 0,
  redirectPath: "/login",
  wrapperDisplayName: "UserIsAuthenticated"
};

export const userIsAuthenticated = createOnEnter(options);

export default connectedRouterRedirect(options);
