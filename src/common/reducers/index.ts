import { routerReducer } from "react-router-redux";
import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import notifications, { INotificationState } from "./notification";
import tournament, { ITournamentState } from "./tournament";
import user, { IUserState } from "./user";
import team, { ITeamState } from "./team";

export interface IAppState {
  form?: typeof formReducer;
  notifications?: INotificationState;
  routing?: typeof routerReducer;
  tournament?: ITournamentState;
  user?: IUserState;
  team?: ITeamState;
}

export default combineReducers<IAppState>({
  form: formReducer,
  notifications,
  routing: routerReducer,
  tournament,
  user,
  team
});
