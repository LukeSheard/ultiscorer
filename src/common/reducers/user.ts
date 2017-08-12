import * as jwt from "jwt-decode";
import { Action } from "redux";
import User from "../../server/models/user";

export enum USER_ACTION_TYPES {
  // LOGIN
  LOGIN_REQUEST = "USER_LOGIN_REQUEST",
  LOGIN_FAILURE = "USER_LOGIN_FAILURE",
  LOGIN_SUCCESS = "USER_LOGIN_SUCCESS",

  // SIGNUP
  SIGNUP_REQUEST = "USER_SIGNUP_REQUEST",
  SIGNUP_FAILURE = "USER_SIGNUP_FAILURE",
  SIGNUP_SUCCESS = "USER_SIGNUP_SUCCESS",

  // SIGNOUT
  SIGNOUT_REQUEST = "USER_SIGNOUT_REQUEST",
  SIGNOUT_SUCCESS = "USER_SIGNOUT_SUCCESS",

  // UPDATE
  UPDATE_REQUEST = "USER_UPDATE_REQUEST",
  UPDATE_FAILURE = "USER_UPDATE_FAILURE",
  UPDATE_SUCCESS = "USER_UPDATE_SUCCESS"
}

export interface IUserAction extends Action {
  type: USER_ACTION_TYPES;
  payload?: any;
}

export function createUserAction(
  type: USER_ACTION_TYPES,
  payload?: any
): IUserAction {
  return {
    payload,
    type
  };
}

export const INITIAL_STATE = {
  jwt: {},
  loading: false
};

export interface IUserState {
  loading: boolean;
  jwt: {
    exp?: number;
    iat?: number;
    user?: any;
  };
  token?: string;
  user?: User;
}

export default function(
  state = INITIAL_STATE,
  action: IUserAction
): IUserState {
  switch (action.type) {
    case USER_ACTION_TYPES.SIGNUP_REQUEST:
    case USER_ACTION_TYPES.UPDATE_REQUEST:
    case USER_ACTION_TYPES.LOGIN_REQUEST: {
      return {
        ...state,
        loading: true
      };
    }
    case USER_ACTION_TYPES.UPDATE_SUCCESS: {
      return {
        ...state,
        loading: false,
        user: action.payload
      };
    }
    case USER_ACTION_TYPES.UPDATE_FAILURE: {
      return {
        ...state,
        loading: false
      };
    }
    case USER_ACTION_TYPES.SIGNUP_SUCCESS:
    case USER_ACTION_TYPES.LOGIN_SUCCESS: {
      const jwtPayload = jwt(action.payload.token);
      return {
        jwt: jwtPayload,
        loading: false,
        token: action.payload.token,
        user: action.payload.user
      };
    }
    case USER_ACTION_TYPES.SIGNUP_FAILURE:
    case USER_ACTION_TYPES.LOGIN_FAILURE:
    case USER_ACTION_TYPES.SIGNOUT_SUCCESS: {
      return INITIAL_STATE;
    }
    default: {
      return state;
    }
  }
}
