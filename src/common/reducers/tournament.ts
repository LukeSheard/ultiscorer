import { Action } from "redux";

export enum TOURNAMENT_ACTION_TYPES {
  TOURNAMENT_CREATE_REQUEST = "TOURNAMENT_CREATE_REQUEST",
  TOURNAMENT_CREATE_FAILURE = "TOURNAMENT_CREATE_FAILURE",
  TOURNAMENT_CREATE_SUCCESS = "TOURNAMENT_CREATE_SUCCESS"
}

export interface ITournamentAction extends Action {
  type: TOURNAMENT_ACTION_TYPES;
  payload?: any;
}

export function createTournamentAction(
  type: TOURNAMENT_ACTION_TYPES,
  payload?: any
): ITournamentAction {
  return {
    payload,
    type
  };
}

export const INITIAL_STATE = {
  tournaments: {}
};

export interface ITournamentState {
  tournaments: object;
  current?: string;
}

export default function(
  state = INITIAL_STATE,
  action: ITournamentAction
): ITournamentState {
  switch (action.type) {
    case TOURNAMENT_ACTION_TYPES.TOURNAMENT_CREATE_SUCCESS: {
      return {
        ...state,
        tournaments: {
          ...state.tournaments,
          [action.payload.id]: action.payload
        }
      };
    }
    default: {
      return state;
    }
  }
}
