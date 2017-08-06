import { put } from "redux-saga/effects";
import request from "../../../api";
import {
  ITournamentAction,
  TOURNAMENT_ACTION_TYPES
} from "../../../reducers/tournament";

export default function*({ params }) {
  try {
    const response = yield request(`/tournament?_id=${params.id}`);
    yield put<ITournamentAction>({
      payload: {
        selected: params.id,
        tournaments: response.data // TODO: Change API API
      },
      type: TOURNAMENT_ACTION_TYPES.TOURNAMENT_GET_SUCCESS
    });
  } catch (e) {
    yield put<ITournamentAction>({
      type: TOURNAMENT_ACTION_TYPES.TOURNAMENT_GET_FAILURE
    });
  }
}
