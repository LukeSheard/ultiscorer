import { put } from "redux-saga/effects";
import request from "../../../api";
import {
  ITeamAction,
  TEAM_ACTION_TYPES
} from "../../../reducers/team";

export default function*() {
  try {
    const response = yield request("/team?expand[]=divisions");
    yield put<ITeamAction>({
      payload: {
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
