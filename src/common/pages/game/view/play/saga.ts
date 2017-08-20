import { Intent } from "@blueprintjs/core";
import { LOCATION_CHANGE } from "react-router-redux";
import { cancel, put, select, take, takeEvery } from "redux-saga/effects";
import request from "../../../../api";
import { IAppState } from "../../../../reducers";
import { GAME_ACTION_TYPES, IGameAction } from "../../../../reducers/game";
import { createNotification } from "../../../../reducers/notification";

export function* update() {
  let response;
  try {
    const selected: string = yield select(
      (state: IAppState) => state.game.selected
    );
    const body = yield select((state: IAppState) => state.game.games[selected]);
    response = yield request(`/game/${selected}`, {
      body,
      method: "PUT"
    });
  } catch (e) {
    yield put(
      createNotification({
        intent: Intent.DANGER,
        message: "Incorrect login details"
      })
    );
  }

  yield put<IGameAction>({
    payload: response,
    type: GAME_ACTION_TYPES.GAME_UPDATE_SUCCESS
  });
}

export function* saga() {
  const watcher = yield takeEvery(
    [GAME_ACTION_TYPES.GAME_ADD_EVENT, GAME_ACTION_TYPES.GAME_UNDO_EVENT],
    update
  );

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}
