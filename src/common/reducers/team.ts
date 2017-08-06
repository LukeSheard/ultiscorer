import { Action } from "redux";

export enum TEAM_ACTION_TYPES {
  // Create
  TEAM_CREATE_REQUEST = "TEAM_CREATE_REQUEST",
  TEAM_CREATE_FAILURE = "TEAM_CREATE_FAILURE",
  TEAM_CREATE_SUCCESS = "TEAM_CREATE_SUCCESS",

  // Get
  TEAM_GET_REQUEST = "TEAM_GET_REQUEST",
  TEAM_GET_FAILURE = "TEAM_GET_FAILURE",
  TEAM_GET_SUCCESS = "TEAM_GET_SUCCESS",

  // Select
  TEAM_SELECT = "TEAM_SELECT"
}

export interface ITeamAction extends Action {
  type: TEAM_ACTION_TYPES;
  payload?: any;
}

export function createTeamAction(
  type: TEAM_ACTION_TYPES,
  payload?: any
): ITeamAction {
  return {
    payload,
    type
  };
}

export const INITIAL_STATE = {
  loading: true,
  teams: {}
};

export interface ITeamState {
  loading: boolean;
  teams: object;
  selected?: string;
}

export default function(
  state = INITIAL_STATE,
  action: ITeamAction
): ITeamState {
  switch (action.type) {
    case TEAM_ACTION_TYPES.TEAM_SELECT: {
      return {
        selected: action.payload,
        ...state
      };
    }
    case TEAM_ACTION_TYPES.TEAM_GET_REQUEST:
    case TEAM_ACTION_TYPES.TEAM_CREATE_REQUEST: {
      return {
        ...state,
        loading: true
      };
    }
    case TEAM_ACTION_TYPES.TEAM_GET_FAILURE:
    case TEAM_ACTION_TYPES.TEAM_CREATE_FAILURE: {
      return {
        ...state,
        loading: false
      };
    }
    case TEAM_ACTION_TYPES.TEAM_CREATE_SUCCESS: {
      return {
        ...state,
        loading: false,
        teams: {
          ...state.teams,
          [action.payload.id]: action.payload
        }
      };
    }
    case TEAM_ACTION_TYPES.TEAM_GET_SUCCESS: {
      return {
        ...state,
        loading: false,
        selected: action.payload.selected,
        teams: {
          ...state.teams,
          ...action.payload.teams.reduce((teams, team) => {
            teams[team.id] = team;
            return teams;
          }, {})
        }
      };
    }
    default: {
      return state;
    }
  }
}
