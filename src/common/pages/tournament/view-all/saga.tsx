import { put } from "redux-saga/effects";
import request from "../../../api";
import {
  ITournamentAction,
  TOURNAMENT_ACTION_TYPES
} from "../../../reducers/tournament";

export default function*() {
  try {
    const tournaments = yield request("/tournament?expand[]=divisions");
    yield put<ITournamentAction>({
      payload: {
        tournaments
      },
      type: TOURNAMENT_ACTION_TYPES.TOURNAMENT_GET_SUCCESS
    });
  } catch (e) {
    yield put<ITournamentAction>({
      type: TOURNAMENT_ACTION_TYPES.TOURNAMENT_GET_FAILURE
    });
  }
}
