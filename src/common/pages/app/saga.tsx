import { Intent } from "@blueprintjs/core";
import { LOCATION_CHANGE, push } from "react-router-redux";
import { cancel, put, take, takeLatest } from "redux-saga/effects";
import request from "../../api";
import { NOTIFICATION_ACTION_TYPES } from "../../reducers/notification";
import { USER_ACTION_TYPES } from "../../reducers/user";

export function* logoutUser(action) {
  try {
    yield request("/auth/sign-out", {
      body: action.payload,
      method: "POST"
    });
    yield put({
      payload: {
        intent: Intent.SUCCESS,
        message: "Successfully signed out"
      },
      type: NOTIFICATION_ACTION_TYPES.CREATE
    });
  } catch (e) {
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
    yield put(push("/login"));
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
