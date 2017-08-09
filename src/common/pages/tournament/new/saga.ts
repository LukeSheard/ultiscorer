import { Intent } from "@blueprintjs/core";
import debug from "debug";
import { LOCATION_CHANGE, push } from "react-router-redux";
import { cancel, put, take, takeLatest } from "redux-saga/effects";
import request from "../../../api";
import { createNotification } from "../../../reducers/notification";
import {
  ITournamentAction,
  TOURNAMENT_ACTION_TYPES
} from "../../../reducers/tournament";

const log = debug("app:pages:tournament:new:saga");

export function* createTournament(action) {
  try {
    const response = yield request("/tournament", {
      body: action.payload,
      method: "POST"
    });
    yield put<ITournamentAction>({
      payload: response.data, // TODO: Change API API
      type: TOURNAMENT_ACTION_TYPES.TOURNAMENT_CREATE_SUCCESS
    });
    yield put(
      createNotification({
        intent: Intent.SUCCESS,
        message: "Tournament Created"
      })
    );
    yield put(push(`/tournaments/${response.data.id}`));
  } catch (e) {
    log("Error %s", e);
    yield put(
      createNotification({
        intent: Intent.DANGER,
        message: "Incorrect login details"
      })
    );
  }
}

export default function*() {
  const watcher = yield takeLatest(
    TOURNAMENT_ACTION_TYPES.TOURNAMENT_CREATE_REQUEST,
    createTournament
  );

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}
