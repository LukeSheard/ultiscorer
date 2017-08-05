import { put } from "redux-saga/effects";
import { USER_ACTION_TYPES } from "../../reducers/user";

export default function*() {
  yield put({
    type: USER_ACTION_TYPES.SIGNOUT_REQUEST
  });
}
