import { Classes } from "@blueprintjs/core";
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router";
import Tournament from "../../../../server/models/tournament";
import { IAppState } from "../../../reducers";
import saga from "./saga";

export class TournamentsView extends React.Component<any, any> {
  public render() {
    const { loading, tournamentInfo, tournaments } = this.props;
    return (
      <div
        style={{
          alignContent: "space-between",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-evenly"
        }}
      >
        {loading}
        {tournaments.map(id => {
          const tournament: Tournament = tournamentInfo[id].attributes;
          return (
            <div
              className={`${Classes.CARD} ${Classes.INTERACTIVE}`}
              key={id}
              style={{
                display: "flex",
                flexBasis: "40%",
                flexDirection: "row",
                flexShrink: 0,
                justifyContent: "space-between",
                margin: "10px 5%"
              }}
            >
              <div>
                <h3>
                  {tournament.name}
                </h3>
                <h5>
                  {tournament.location}
                </h5>
              </div>
              {(tournament.divisions || []).map(division => {
                return (
                  <Link to={`/tournaments/${id}/divisions/${division.id}`}>
                    {division.name}
                  </Link>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

export const ConnectedTournamentsView = connect((state: IAppState) => ({
  loading: state.tournament && state.tournament.loading,
  tournamentInfo: state.tournament && state.tournament.tournaments,
  tournaments: state.tournament && Object.keys(state.tournament.tournaments)
}))(TournamentsView);

export default class TournamentsPage extends React.Component<any, any> {
  public static saga = saga;

  public render() {
    return <ConnectedTournamentsView />;
  }
}
