import { routerReducer } from "react-router-redux";
import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import user, { IUserState } from "./user";

export interface IAppState {
  form?: typeof formReducer;
  routing?: typeof routerReducer;
  user?: IUserState;
}

export default combineReducers<IAppState>({
  form: formReducer,
  routing: routerReducer,
  user
});
