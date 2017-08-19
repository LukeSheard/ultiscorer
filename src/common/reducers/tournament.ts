import { Action } from "redux";
import Tournament from "../../models/tournament";

export enum TOURNAMENT_ACTION_TYPES {
  // Create
  TOURNAMENT_CREATE_REQUEST = "TOURNAMENT_CREATE_REQUEST",
  TOURNAMENT_CREATE_FAILURE = "TOURNAMENT_CREATE_FAILURE",
  TOURNAMENT_CREATE_SUCCESS = "TOURNAMENT_CREATE_SUCCESS",

  // Get
  TOURNAMENT_GET_REQUEST = "TOURNAMENT_GET_REQUEST",
  TOURNAMENT_GET_FAILURE = "TOURNAMENT_GET_FAILURE",
  TOURNAMENT_GET_SUCCESS = "TOURNAMENT_GET_SUCCESS",

  // Select
  TOURNAMENT_SELECT = "TOURNAMENT_SELECT"
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
  loading: true,
  tournaments: {}
};

export interface ITournamentState {
  loading: boolean;
  tournaments: {
    [id: string]: Tournament;
  };
  selected?: string;
}

export default function(
  state = INITIAL_STATE,
  action: ITournamentAction
): ITournamentState {
  switch (action.type) {
    case TOURNAMENT_ACTION_TYPES.TOURNAMENT_SELECT: {
      return {
        selected: action.payload,
        ...state
      };
    }
    case TOURNAMENT_ACTION_TYPES.TOURNAMENT_GET_REQUEST:
    case TOURNAMENT_ACTION_TYPES.TOURNAMENT_CREATE_REQUEST: {
      return {
        ...state,
        loading: true
      };
    }
    case TOURNAMENT_ACTION_TYPES.TOURNAMENT_GET_FAILURE:
    case TOURNAMENT_ACTION_TYPES.TOURNAMENT_CREATE_FAILURE: {
      return {
        ...state,
        loading: false
      };
    }
    case TOURNAMENT_ACTION_TYPES.TOURNAMENT_CREATE_SUCCESS: {
      return {
        ...state,
        loading: false,
        tournaments: {
          ...state.tournaments,
          [action.payload.id]: action.payload
        }
      };
    }
    case TOURNAMENT_ACTION_TYPES.TOURNAMENT_GET_SUCCESS: {
      return {
        ...state,
        loading: false,
        selected: action.payload.selected,
        tournaments: {
          ...state.tournaments,
          ...action.payload.tournaments.reduce((tournaments, tournament) => {
            tournament.startDate = new Date(tournament.startDate);
            tournament.endDate = new Date(tournament.endDate);
            tournaments[tournament.id] = tournament;
            return tournaments;
          }, {})
        }
      };
    }
    default: {
      return state;
    }
  }
}
