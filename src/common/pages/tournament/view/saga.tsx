import { put } from "redux-saga/effects";
import request from "../../../api";
import {
  ITournamentAction,
  TOURNAMENT_ACTION_TYPES
} from "../../../reducers/tournament";

export default function*({ params }) {
  try {
    const tournament = yield request(`/tournament/${params.id}`);
    yield put<ITournamentAction>({
      payload: {
        selected: params.id,
        tournaments: [tournament] // TODO: Change API API
      },
      type: TOURNAMENT_ACTION_TYPES.TOURNAMENT_GET_SUCCESS
    });
  } catch (e) {
    yield put<ITournamentAction>({
      type: TOURNAMENT_ACTION_TYPES.TOURNAMENT_GET_FAILURE
    });
  }
}
