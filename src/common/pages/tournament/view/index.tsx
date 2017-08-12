export { default as saga } from "./saga";

import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router";
import Tournament from "../../../../server/models/tournament";
import { IAppState } from "../../../reducers";

export interface ITournamentViewProps {
  tournament?: Tournament;
}

export class TournamentsView extends React.Component<any, any> {
  public render() {
    const { children, loading, tournament } = this.props;

    if (loading) {
      return <div>Loading</div>;
    }
    return (
      <div>
        <h1>
          {tournament && tournament.name}
        </h1>
        <h3>
          {tournament && tournament.location}
        </h3>
        {tournament &&
          tournament.divisions.map(division => {
            return (
              <Link
                to={`/tournament/${tournament._id}/${division._id}`}
                key={division._id}
              >
                <h4>
                  {division.name}
                </h4>
              </Link>
            );
          })}
        <div>
          {children}
        </div>
      </div>
    );
  }
}

export default connect((state: IAppState) => {
  const props: any = {
    loading: state.tournament && state.tournament.loading
  };

  const current = state.tournament && state.tournament.selected;
  if (current) {
    props.tournament =
      state.tournament && state.tournament.tournaments[current].attributes;
  }

  return props;
})(TournamentsView);
