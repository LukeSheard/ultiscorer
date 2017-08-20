import { routerReducer, RouterState } from "react-router-redux";
import { combineReducers } from "redux";
import { FormReducer, reducer as formReducer } from "redux-form";
import club, { IClubState } from "./club";
import notifications, { INotificationState } from "./notification";
import team, { ITeamState } from "./team";
import tournament, { ITournamentState } from "./tournament";
import user, { IUserState } from "./user";

export interface IAppState {
  club: IClubState;
  form: FormReducer;
  notifications: INotificationState;
  routing: RouterState;
  tournament: ITournamentState;
  team: ITeamState;
  user: IUserState;
}

export default combineReducers<IAppState>({
  club,
  form: formReducer,
  notifications,
  routing: routerReducer,
  team,
  tournament,
  user
});
