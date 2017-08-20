import { Icon, IconClasses } from "@blueprintjs/core";
import * as React from "react";
import { connect } from "react-redux";
export { default as prefetch } from "./saga";
import Loading from "../../../components/loading";
import GameStatistics from "../../../components/stats";
import { IAppState } from "../../../reducers";

export class GameView extends React.Component<any, any> {
  constructor(props, ctx) {
    super(props, ctx);
    this.renderIcon = this.renderIcon.bind(this);
  }

  public render() {
    const { children, game, loading } = this.props;

    if (loading && !game) {
      return <Loading />;
    }

    return (
      <div>
        <header>
          <h1>
            {game.home.name} {this.renderIcon(game.home.Id)} <small>vs.</small>{" "}
            {game.away.name} {this.renderIcon(game.away.Id)}
          </h1>
        </header>
        {children}
        <GameStatistics game={game} />
      </div>
    );
  }

  private renderIcon(id) {
    const { game } = this.props;
    if (id === game.firstPull) {
      return <Icon iconName={IconClasses.CIRCLE} />;
    }
    return null;
  }
}

export function mapStateToProps(state: IAppState) {
  return {
    game: state.game.selected ? state.game.games[state.game.selected] : {},
    loading: state.game.loading
  };
}

export default connect(mapStateToProps)(GameView);
