import { put } from "redux-saga/effects";
import request from "../../../api";
import { GAME_ACTION_TYPES, IGameAction } from "../../../reducers/game";
import { createNotification } from "../../../reducers/notification";

export default function*({ params }) {
  try {
    const game = yield request(`/game/${params.id}`);
    yield put<IGameAction>({
      payload: {
        games: [game],
        selected: params.id
      },
      type: GAME_ACTION_TYPES.GAME_GET_SUCCESS
    });
  } catch (e) {
    yield put(
      createNotification({
        message: "Game does not exist"
      })
    );
  }
}
