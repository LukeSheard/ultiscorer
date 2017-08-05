import { routerReducer } from "react-router-redux";
import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import notifications, { INotificationState } from "./notification";
import tournament, { ITournamentState } from "./tournament";
import user, { IUserState } from "./user";

export interface IAppState {
  form?: typeof formReducer;
  notifications?: INotificationState;
  routing?: typeof routerReducer;
  tournament?: ITournamentState;
  user?: IUserState;
}

export default combineReducers<IAppState>({
  form: formReducer,
  notifications,
  routing: routerReducer,
  tournament,
  user
});
