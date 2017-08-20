export { saga } from "./saga";

import { Button, Classes, Intent } from "@blueprintjs/core";
import * as cx from "classnames";
import * as React from "react";
import { connect } from "react-redux";
import { IAppState } from "../../../../reducers";
import { GAME_ACTION_TYPES, POINT_ACTIONS } from "../../../../reducers/game";
const style = require("./style.css");

export class GamePlayView extends React.Component<any, any> {
  public render() {
    const { enabled, half, score, turn, undo } = this.props;

    return (
      <section>
        <h2>Play</h2>
        <div className={style.buttons}>
          <Button
            text="Turnover"
            intent={Intent.DANGER}
            className={cx(Classes.FILL, style.button)}
            onClick={turn}
          />
          <Button
            text="Score"
            intent={Intent.SUCCESS}
            className={cx(Classes.FILL, style.button)}
            onClick={score}
          />
          <Button
            text="Half"
            intent={Intent.PRIMARY}
            className={cx(Classes.FILL, style.button)}
            onClick={half}
            disabled={enabled && !enabled.half}
          />
          <Button
            text="Undo"
            intent={Intent.WARNING}
            className={cx(Classes.FILL, style.button)}
            onClick={undo}
            disabled={enabled && !enabled.undo}
          />
        </div>
      </section>
    );
  }
}

export function mapStateToProps(state: IAppState) {
  const game = state.game.selected
    ? state.game.games[state.game.selected]
    : void 0;
  const props: any = {};

  if (game) {
    props.enabled = {
      half:
        game.actions.filter(p => p.action === POINT_ACTIONS.SCORE).length &&
        game.actions.slice(-1)[0].action === POINT_ACTIONS.SCORE &&
        !game.actions.filter(p => p.action === POINT_ACTIONS.HALF).length,
      undo: game.actions.length > 0
    };
  }

  return props;
}

export function mapDispatchToProps(dispatch) {
  return {
    half: () =>
      dispatch({
        payload: POINT_ACTIONS.HALF,
        type: GAME_ACTION_TYPES.GAME_ADD_EVENT
      }),
    score: () =>
      dispatch({
        payload: POINT_ACTIONS.SCORE,
        type: GAME_ACTION_TYPES.GAME_ADD_EVENT
      }),
    turn: () =>
      dispatch({
        payload: POINT_ACTIONS.TURN,
        type: GAME_ACTION_TYPES.GAME_ADD_EVENT
      }),
    undo: () =>
      dispatch({
        type: GAME_ACTION_TYPES.GAME_UNDO_EVENT
      })
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GamePlayView);
