import { Intent } from "@blueprintjs/core";
import debug from "debug";
import { LOCATION_CHANGE } from "react-router-redux";
import { cancel, put, take, takeLatest } from "redux-saga/effects";
import request from "../api";
import { NOTIFICATION_ACTION_TYPES } from "../reducers/notification";
import { USER_ACTION_TYPES } from "../reducers/user";

const log = debug("app:pages:app:saga");

export function* logoutUser() {
  try {
    yield request("/auth/sign-out");
    yield put({
      payload: {
        intent: Intent.SUCCESS,
        message: "Successfully signed out"
      },
      type: NOTIFICATION_ACTION_TYPES.CREATE
    });
  } catch (e) {
    log("Error %s", e);
    yield put({
      payload: {
        intent: Intent.DANGER,
        message: "Failed to clear sign in cookie"
      },
      type: NOTIFICATION_ACTION_TYPES.CREATE
    });
  } finally {
    yield put({
      type: USER_ACTION_TYPES.SIGNOUT_SUCCESS
    });
  }
}

export default function*() {
  const watcher = yield takeLatest(
    USER_ACTION_TYPES.SIGNOUT_REQUEST,
    logoutUser
  );

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}
