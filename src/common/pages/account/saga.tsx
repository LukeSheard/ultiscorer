import { Intent } from "@blueprintjs/core";
import debug from "debug";
import { LOCATION_CHANGE } from "react-router-redux";
import { cancel, put, select, take, takeLatest } from "redux-saga/effects";
import request from "../../api";
import { IAppState } from "../../reducers";
import { createNotification } from "../../reducers/notification";
import { IUserAction, USER_ACTION_TYPES } from "../../reducers/user";

const log = debug("app:pages:account:saga");

export function* updateUser(action) {
  const id = yield select((state: IAppState) => state.user.jwt.user._id);
  try {
    const response = yield request(`/user/${id}`, {
      body: action.payload,
      method: "PUT"
    });
    yield put<IUserAction>({
      payload: response.data.attributes,
      type: USER_ACTION_TYPES.UPDATE_SUCCESS
    });
    yield put(
      createNotification({
        intent: Intent.SUCCESS,
        message: "Tournament Created"
      })
    );
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
    USER_ACTION_TYPES.UPDATE_REQUEST,
    updateUser
  );

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}
