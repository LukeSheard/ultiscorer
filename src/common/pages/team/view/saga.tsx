import { put } from "redux-saga/effects";
import request from "../../../api";
import { ITeamAction, TEAM_ACTION_TYPES } from "../../../reducers/team";

export default function*({ params }) {
  try {
    const response = yield request(`/team?_id=${params.id}`);
    yield put<ITeamAction>({
      payload: {
        selected: params.id,
        teams: response.data // TODO: Change API API
      },
      type: TEAM_ACTION_TYPES.TEAM_GET_SUCCESS
    });
  } catch (e) {
    yield put<ITeamAction>({
      type: TEAM_ACTION_TYPES.TEAM_GET_FAILURE
    });
  }
}
