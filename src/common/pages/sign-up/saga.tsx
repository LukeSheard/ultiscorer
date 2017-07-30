import { Intent } from "@blueprintjs/core";
import * as get from "lodash.get";
import { LOCATION_CHANGE, push } from "react-router-redux";
import { cancel, put, select, take, takeLatest } from "redux-saga/effects";
import request from "../../api";
import { createNotification } from "../../reducers/notification";
import { USER_ACTION_TYPES } from "../../reducers/user";

export function* loginUser(action) {
  try {
    const response = yield request("/auth/sign-up", {
      body: action.payload,
      method: "POST"
    });
    yield put({
      payload: response,
      type: USER_ACTION_TYPES.SIGNUP_SUCCESS
    });
    const redirect = yield select(state =>
      get(
        state,
        "routing.locationBeforeTransitions.query.redirect",
        "dashboard"
      )
    );

    return yield put(push(redirect));
  } catch (e) {
    yield put(
      createNotification({
        intent: Intent.DANGER,
        message: "There was an error with your signup details"
      })
    );
    yield put({ type: USER_ACTION_TYPES.SIGNUP_FAILURE });
  }
}

export default function*() {
  const watcher = yield takeLatest(USER_ACTION_TYPES.SIGNUP_REQUEST, loginUser);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}
