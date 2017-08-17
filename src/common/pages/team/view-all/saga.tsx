import debug from "debug";
import { put } from "redux-saga/effects";
import request from "../../../api";
import { ITeamAction, TEAM_ACTION_TYPES } from "../../../reducers/team";

const log = debug("app:pages:team:view-all:saga");

export default function*() {
  try {
    const teams = yield request("/team");
    yield put<ITeamAction>({
      payload: {
        teams // TODO: Change API API
      },
      type: TEAM_ACTION_TYPES.TEAM_GET_SUCCESS
    });
  } catch (e) {
    log("Error %s", e);
    yield put<ITeamAction>({
      type: TEAM_ACTION_TYPES.TEAM_GET_FAILURE
    });
  }
}
