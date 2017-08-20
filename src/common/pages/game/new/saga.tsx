import { LOCATION_CHANGE } from "react-router-redux";
import { cancel, put, take, takeLatest } from "redux-saga/effects";
import request from "../../../api";
import { ITeamAction, TEAM_ACTION_TYPES } from "../../../reducers/team";
import {
  ITournamentAction,
  TOURNAMENT_ACTION_TYPES
} from "../../../reducers/tournament";

export function* prefetch() {
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

export function* fetchDivisionTeams({ payload, meta }) {
  console.log(meta, payload);
  try {
    const teams = yield request(`/division/${payload}/relationships/teams`);
    yield put<ITeamAction>({
      payload: {
        teams
      },
      type: TEAM_ACTION_TYPES.TEAM_GET_SUCCESS
    });
  } catch (e) {
    yield put<ITeamAction>({
      type: TEAM_ACTION_TYPES.TEAM_GET_FAILURE
    });
  }
}

export function* saga() {
  const watcher = yield takeLatest(
    (action => {
      return (
        action.meta &&
        action.meta.form === "new-game" &&
        action.meta.field === "division" &&
        action.payload &&
        action.payload.length
      );
    }) as any,
    fetchDivisionTeams
  );

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}
