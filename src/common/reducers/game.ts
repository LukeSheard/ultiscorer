import { Action } from "redux";

export enum GAME_ACTION_TYPES {
  // Create
  GAME_CREATE_REQUEST = "GAME_CREATE_REQUEST",
  GAME_CREATE_FAILURE = "GAME_CREATE_FAILURE",
  GAME_CREATE_SUCCESS = "GAME_CREATE_SUCCESS",

  // Update
  GAME_UPDATE_FAILURE = "GAME_UPDATE_FAILURE",
  GAME_UPDATE_SUCCESS = "GAME_UPDATE_SUCCESS",

  // Get
  GAME_GET_REQUEST = "GAME_GET_REQUEST",
  GAME_GET_FAILURE = "GAME_GET_FAILURE",
  GAME_GET_SUCCESS = "GAME_GET_SUCCESS",

  GAME_ADD_EVENT = "GAME_ADD_POINT",
  GAME_UNDO_EVENT = "GAME_UNDO_POINT",

  // Select
  GAME_SELECT = "GAME_SELECT"
}

export interface IGameAction extends Action {
  type: GAME_ACTION_TYPES;
  payload?: any;
}

export function createGameAction(
  type: GAME_ACTION_TYPES,
  payload?: any
): IGameAction {
  return {
    payload,
    type
  };
}

export const INITIAL_STATE: IGameState = {
  games: {},
  loading: false
};

export interface IGameState {
  loading: boolean;
  games: object;
  selected?: string;
}

export enum POINT_ACTIONS {
  TURN = "TURN",
  SCORE = "SCORE",
  HALF = "HALF"
}

export default function(
  state = INITIAL_STATE,
  action: IGameAction
): IGameState {
  switch (action.type) {
    case GAME_ACTION_TYPES.GAME_ADD_EVENT: {
      if (!state.selected) {
        return state;
      }
      const game = state.games[state.selected];
      return {
        ...state,
        games: {
          ...state.games,
          [game.id]: {
            ...game,
            actions: [
              ...game.actions,
              {
                action: action.payload,
                time: new Date()
              }
            ]
          }
        }
      };
    }
    case GAME_ACTION_TYPES.GAME_UNDO_EVENT: {
      if (!state.selected) {
        return state;
      }
      const game = state.games[state.selected];
      return {
        ...state,
        games: {
          ...state.games,
          [game.id]: {
            ...game,
            actions: game.actions.slice(0, -1)
          }
        }
      };
    }
    case GAME_ACTION_TYPES.GAME_SELECT: {
      return {
        selected: action.payload,
        ...state
      };
    }
    case GAME_ACTION_TYPES.GAME_GET_REQUEST:
    case GAME_ACTION_TYPES.GAME_CREATE_REQUEST: {
      return {
        ...state,
        loading: true
      };
    }
    case GAME_ACTION_TYPES.GAME_GET_FAILURE:
    case GAME_ACTION_TYPES.GAME_CREATE_FAILURE: {
      return {
        ...state,
        loading: false
      };
    }
    case GAME_ACTION_TYPES.GAME_CREATE_SUCCESS: {
      return {
        ...state,
        games: {
          ...state.games,
          [action.payload.id]: action.payload
        },
        loading: false
      };
    }
    case GAME_ACTION_TYPES.GAME_GET_SUCCESS: {
      return {
        ...state,
        games: {
          ...state.games,
          ...action.payload.games.reduce((games, game) => {
            games[game.id] = game;
            return games;
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
