import * as React from "react";
import { connect } from "react-redux";
import Game from "../../../../models/game";
import CardView from "../../../components/cardview";
import { CardProps } from "../../../components/cardview/card";
import Loading from "../../../components/loading";
import { IAppState } from "../../../reducers";
export { prefetch } from "./saga";
const style = require("./style.css");

export interface TournamentsViewAllPageProps
  extends React.Props<GamesViewAllPage> {
  games: CardProps[];
  loading: boolean;
}

export const nonIdealProps = {
  title: "Create New Game"
};

export class GamesViewAllPage extends React.Component<
  TournamentsViewAllPageProps,
  {}
> {
  public render() {
    const { loading, games } = this.props;

    if (loading) {
      return <Loading />;
    }

    return (
      <div>
        <h1 className={style.title}>Games</h1>
        <CardView nonIdealProps={nonIdealProps} cards={games} />
      </div>
    );
  }
}

export function mapGameToCard(game: Game): CardProps {
  return {
    link: `/games/${game.id}`,
    message: `${game.division.name} (${game.division.gender})`,
    subtitle: game.tournament.name,
    title: `${game.home.name} vs. ${game.away.name}`
  };
}

export default connect((state: IAppState) => {
  return {
    games: Object.values(state.game.games).map(mapGameToCard),
    loading: state.game.loading
  };
})(GamesViewAllPage);
