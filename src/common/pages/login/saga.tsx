import { Intent } from "@blueprintjs/core";
import debug from "debug";
import * as get from "lodash.get";
import { LOCATION_CHANGE, push } from "react-router-redux";
import { cancel, put, select, take, takeLatest } from "redux-saga/effects";
import request from "../../api";
import { createNotification } from "../../reducers/notification";
import { USER_ACTION_TYPES } from "../../reducers/user";

const log = debug("app:pages:login:saga");

export function* loginUser(action) {
  try {
    const response = yield request("/auth/sign-in", {
      body: action.payload,
      method: "POST"
    });
    yield put({
      payload: response,
      type: USER_ACTION_TYPES.LOGIN_SUCCESS
    });
    const redirect = yield select(state =>
      get(
        state,
        "routing.locationBeforeTransitions.query.redirect",
        "dashboard"
      )
    );

    yield put(
      createNotification({
        intent: Intent.SUCCESS,
        message: "Logged In"
      })
    );

    return yield put(push(redirect));
  } catch (e) {
    log("Error %s", e);
    yield put(
      createNotification({
        intent: Intent.DANGER,
        message: "Incorrect login details"
      })
    );
    yield put({ type: USER_ACTION_TYPES.LOGIN_FAILURE });
  }
}

export default function*() {
  const watcher = yield takeLatest(USER_ACTION_TYPES.LOGIN_REQUEST, loginUser);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}
