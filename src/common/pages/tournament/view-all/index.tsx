import * as moment from "moment";
import * as React from "react";
import { connect } from "react-redux";
import Tournament from "../../../../models/tournament";
import CardView from "../../../components/cardview";
import { CardProps } from "../../../components/cardview/card";
import Loading from "../../../components/loading";
import { IAppState } from "../../../reducers";
export { default as saga } from "./saga";
const style = require("./style.css");

export interface TournamentsViewAllPageProps
  extends React.Props<TournamentsViewAllPage> {
  tournaments: CardProps[];
  loading: boolean;
}

export const nonIdealProps = {
  title: "Create New Tournament"
};

export class TournamentsViewAllPage extends React.Component<
  TournamentsViewAllPageProps,
  {}
> {
  public render() {
    const { loading, tournaments } = this.props;

    if (loading) {
      return <Loading />;
    }

    return (
      <div>
        <h1 className={style.title}>Tournaments</h1>
        <CardView nonIdealProps={nonIdealProps} cards={tournaments} />
      </div>
    );
  }
}

export function mapTournamentToCard(tourmanent: Tournament): CardProps {
  return {
    link: `/tournaments/${tourmanent.id}`,
    message: `${moment(tourmanent.startDate).format("Do MMM YYYY")} - ${moment(
      tourmanent.endDate
    ).format("DD MMM YYYY")}`,
    subtitle: tourmanent.location,
    tags: tourmanent.divisions.map(division => division.name),
    title: tourmanent.name
  };
}

export default connect((state: IAppState) => {
  return {
    loading: state.tournament && state.tournament.loading,
    tournaments: Object.values(state.tournament.tournaments).map(
      mapTournamentToCard
    )
  };
})(TournamentsViewAllPage);
