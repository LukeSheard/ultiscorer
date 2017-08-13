import { Intent } from "@blueprintjs/core";
import debug from "debug";
import { LOCATION_CHANGE } from "react-router-redux";
import { cancel, put, take, takeLatest } from "redux-saga/effects";
import request from "../../../api";
// import { IAppState } from "../../../reducers";
import { createNotification } from "../../../reducers/notification";
import { ITournamentAction, TOURNAMENT_ACTION_TYPES } from "../../../reducers/tournament";

const log = debug("app:pages:tournament:edit:saga");

export function* updateTournament(action) {
  const id = this.props.params.tournament._id;// yield select((state: IAppState) => state.tournament._id);
  try {
    const response = yield request(`/tournament/${id}`, {
      body: action.payload,
      method: "PUT"
    });
    yield put<ITournamentAction>({
      payload: response.data.attributes,
      type: TOURNAMENT_ACTION_TYPES.TOURNAMENT_UPDATE_SUCCESS
    });
    yield put(
      createNotification({
        intent: Intent.SUCCESS,
        message: "Tournament updated"
      })
    );
  } catch (e) {
    log("Error %s", e);
    yield put(
      createNotification({
        intent: Intent.DANGER,
        message: "There was an error processing your request"
      })
    );
  }
}

export default function*() {
  const watcher = yield takeLatest(
    TOURNAMENT_ACTION_TYPES.TOURNAMENT_UPDATE_REQUEST,
    updateTournament
  );

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}
