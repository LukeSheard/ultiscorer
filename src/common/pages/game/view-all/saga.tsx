import { put } from "redux-saga/effects";
import request from "../../../api";
import { GAME_ACTION_TYPES, IGameAction } from "../../../reducers/game";

export function* prefetch() {
  try {
    const games = yield request("/game");
    yield put<IGameAction>({
      payload: {
        games
      },
      type: GAME_ACTION_TYPES.GAME_GET_SUCCESS
    });
  } catch (e) {
    yield put<IGameAction>({
      type: GAME_ACTION_TYPES.GAME_GET_FAILURE
    });
  }
}
