import {
  connectedRouterRedirect,
  createOnEnter
} from "redux-auth-wrapper/history3/redirect";
import { IAppState } from "../../reducers";

const options = {
  authenticatedSelector: (state: IAppState) => {
    if (!state.user) {
      return false;
    }

    return (
      state.user.jwt.exp && new Date(state.user.jwt.exp * 1000) > new Date()
    );
  },
  redirectPath: "/sign-in",
  wrapperDisplayName: "UserIsAuthenticated"
};

export const userIsAuthenticated = createOnEnter(options);

export default connectedRouterRedirect(options);
