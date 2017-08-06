import { routerReducer, RouterState } from "react-router-redux";
import { combineReducers } from "redux";
import { FormReducer, reducer as formReducer } from "redux-form";
import notifications, { INotificationState } from "./notification";
import tournament, { ITournamentState } from "./tournament";
import user, { IUserState } from "./user";

export interface IAppState {
  form: FormReducer;
  notifications: INotificationState;
  routing: RouterState;
  tournament: ITournamentState;
  user: IUserState;
}

export default combineReducers<IAppState>({
  form: formReducer,
  notifications,
  routing: routerReducer,
  tournament,
  user
});
