import { LOCATION_CHANGE, push } from "react-router-redux";
import { cancel, put, take, takeLatest } from "redux-saga/effects";
import request from "../../../api";
import { GAME_ACTION_TYPES, IGameAction } from "../../../reducers/game";
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

export function* createGame({ payload }) {
  try {
    const game = yield request("/game", {
      body: payload,
      method: "POST"
    });
    yield put<IGameAction>({
      payload: {
        games: [game]
      },
      type: GAME_ACTION_TYPES.GAME_GET_SUCCESS
    });
    yield put(push(`/games/${game.id}/`));
  } catch (e) {
    yield put<IGameAction>({
      type: GAME_ACTION_TYPES.GAME_GET_FAILURE
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

  const submitWatcher = yield takeLatest(
    GAME_ACTION_TYPES.GAME_CREATE_REQUEST as any,
    createGame
  );

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
  yield cancel(submitWatcher);
}
