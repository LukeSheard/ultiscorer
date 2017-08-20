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

const log = debug("app:pages:tournament:edit:saga");

export function* createTournament(action) {
  let response;
  try {
    response = yield request(`/tournament/${action.payload.id}`, {
      body: {
        ...action.payload,
        endDate: action.payload.date[1],
        startDate: action.payload.date[0]
      },
      method: "PUT"
    });
  } catch (e) {
    log("Error %s", e);
    yield put(
      createNotification({
        intent: Intent.DANGER,
        message: "Incorrect login details"
      })
    );
  }

  yield put<ITournamentAction>({
    payload: response,
    type: TOURNAMENT_ACTION_TYPES.TOURNAMENT_EDIT_SUCCESS
  });
  yield put(
    createNotification({
      intent: Intent.SUCCESS,
      message: "Tournament Created"
    })
  );
  yield put(push(`/tournaments/${response.id}`));
}

export default function*() {
  const watcher = yield takeLatest(
    TOURNAMENT_ACTION_TYPES.TOURNAMENT_EDIT_REQUEST,
    createTournament
  );

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}
