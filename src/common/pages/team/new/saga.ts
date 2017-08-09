import { Intent } from "@blueprintjs/core";
import debug from "debug";
import { LOCATION_CHANGE } from "react-router-redux";
import { cancel, put, take, takeLatest } from "redux-saga/effects";
import request from "../../../api";
import { createNotification } from "../../../reducers/notification";
import { ITeamAction, TEAM_ACTION_TYPES } from "../../../reducers/team";

const log = debug("app:pages:team:new:saga");

export function* createTeam(action) {
  try {
    const response = yield request("/team", {
      body: action.payload,
      method: "POST"
    });
    yield put<ITeamAction>({
      payload: response.data, // TODO: Change API API
      type: TEAM_ACTION_TYPES.TEAM_CREATE_SUCCESS
    });
    yield put(
      createNotification({
        intent: Intent.SUCCESS,
        message: "Team Created"
      })
    );
  } catch (e) {
    log(e);
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
    TEAM_ACTION_TYPES.TEAM_CREATE_REQUEST,
    createTeam
  );

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}
