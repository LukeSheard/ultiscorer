import { Action } from "redux";

export enum CLUB_ACTION_TYPES {
  // Create
  CLUB_CREATE_REQUEST = "CLUB_CREATE_REQUEST",
  CLUB_CREATE_FAILURE = "CLUB_CREATE_FAILURE",
  CLUB_CREATE_SUCCESS = "CLUB_CREATE_SUCCESS",

  // Get
  CLUB_GET_REQUEST = "CLUB_GET_REQUEST",
  CLUB_GET_FAILURE = "CLUB_GET_FAILURE",
  CLUB_GET_SUCCESS = "CLUB_GET_SUCCESS",

  // Select
  CLUB_SELECT = "CLUB_SELECT"
}

export interface IClubAction extends Action {
  type: CLUB_ACTION_TYPES;
  payload?: any;
}

export function createClubAction(
  type: CLUB_ACTION_TYPES,
  payload?: any
): IClubAction {
  return {
    payload,
    type
  };
}

export const INITIAL_STATE = {
  clubs: {},
  loading: false
};

export interface IClubState {
  loading: boolean;
  clubs: object;
  selected?: string;
}

export default function(
  state = INITIAL_STATE,
  action: IClubAction
): IClubState {
  switch (action.type) {
    case CLUB_ACTION_TYPES.CLUB_SELECT: {
      return {
        selected: action.payload,
        ...state
      };
    }
    case CLUB_ACTION_TYPES.CLUB_GET_REQUEST:
    case CLUB_ACTION_TYPES.CLUB_CREATE_REQUEST: {
      return {
        ...state,
        loading: true
      };
    }
    case CLUB_ACTION_TYPES.CLUB_GET_FAILURE:
    case CLUB_ACTION_TYPES.CLUB_CREATE_FAILURE: {
      return {
        ...state,
        loading: false
      };
    }
    case CLUB_ACTION_TYPES.CLUB_CREATE_SUCCESS: {
      return {
        ...state,
        clubs: {
          ...state.clubs,
          [action.payload.id]: action.payload
        },
        loading: false
      };
    }
    case CLUB_ACTION_TYPES.CLUB_GET_SUCCESS: {
      return {
        ...state,
        clubs: {
          ...state.clubs,
          ...action.payload.clubs.reduce((clubs, club) => {
            clubs[club.id] = club;
            return clubs;
          }, {})
        },
        loading: false,
        selected: action.payload.selected
      };
    }
    default: {
      return state;
    }
  }
}
