import { put } from "redux-saga/effects";
import request from "../../../../api";
import { ITeamAction, TEAM_ACTION_TYPES } from "../../../../reducers/team";

export function* prefetch({ params }) {
  try {
    const teams = yield request(`/tournament/${params.id}/relationships/teams`);
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
