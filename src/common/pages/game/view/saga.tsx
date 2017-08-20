import { put } from "redux-saga/effects";
import request from "../../../api";
import { createNotification } from "../../../reducers/notification";

export default function*({ params }) {
  try {
    const game = yield request(`/game/${params.id}`);
    console.log(game);
  } catch (e) {
    yield put(
      createNotification({
        message: "Game does not exist"
      })
    );
  }
}
