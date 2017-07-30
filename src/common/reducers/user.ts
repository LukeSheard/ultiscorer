import { Action } from "redux";

export enum USER_ACTION_TYPES {
  LOGIN_REQUEST = "USER_LOGIN_REQUEST",
  LOGIN_FAILURE = "USER_LOGIN_FAILURE",
  LOGIN_SUCCESS = "USER_LOGIN_SUCCESS",
  SIGNUP_REQUEST = "USER_SIGNUP_REQUEST",
  SIGNUP_FAILURE = "USER_SIGNUP_FAILURE",
  SIGNUP_SUCCESS = "USER_SIGNUP_SUCCESS",
  SIGNOUT_REQUEST = "USER_SIGNOUT_REQUEST",
  SIGNOUT_SUCCESS = "USER_SIGNOUT_SUCCESS"
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
  loading: false,
  user: {}
};

export interface IUserState {
  loading: boolean;
  user: any;
  token?: string;
}

export default function(
  state = INITIAL_STATE,
  action: IUserAction
): IUserState {
  switch (action.type) {
    case USER_ACTION_TYPES.SIGNUP_REQUEST:
    case USER_ACTION_TYPES.LOGIN_REQUEST: {
      return {
        ...state,
        loading: true
      };
    }
    case USER_ACTION_TYPES.SIGNUP_SUCCESS:
    case USER_ACTION_TYPES.LOGIN_SUCCESS: {
      return {
        ...action.payload,
        loading: false
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
