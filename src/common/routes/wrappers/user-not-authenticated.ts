import {
  connectedRouterRedirect,
  createOnEnter
} from "redux-auth-wrapper/history3/redirect";
import { IAppState } from "../../reducers";

const options = {
  allowRedirectBack: false,
  authenticatedSelector: (state: IAppState) =>
    state.user && state.user.token === void 0,
  redirectPath: "/tournaments",
  wrapperDisplayName: "UserIsNotAuthenticated"
};

export const userIsNotAuthenticated = createOnEnter(options);

export default connectedRouterRedirect(options);
