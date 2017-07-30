import { routerReducer } from "react-router-redux";
import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import notifications, { INotificationState } from "./notification";
import user, { IUserState } from "./user";

export interface IAppState {
  form?: typeof formReducer;
  notifications?: INotificationState;
  routing?: typeof routerReducer;
  user?: IUserState;
}

export default combineReducers<IAppState>({
  form: formReducer,
  notifications,
  routing: routerReducer,
  user
});
