import { Button, Classes, Intent, NonIdealState, Tag } from "@blueprintjs/core";
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router";
import Tournament from "../../../../server/models/tournament";
import { IAppState } from "../../../reducers";
import saga from "./saga";
const style = require("./style.css");

export class TournamentsView extends React.Component<any, any> {
  public render() {
    const { loading, tournamentInfo, tournaments } = this.props;

    if (loading) {
      return <div>Loading</div>;
    }

    return (
      <div>
        <div className={style.row}>
          <h1 className={style.title}>Tournaments</h1>
          <Link to="tournaments/new">
            <Button
              className={Classes.FILL}
              intent={Intent.PRIMARY}
              text="Create Tournament"
            />
          </Link>
        </div>
        <div className={style.tournamentView}>
          {tournaments.length
            ? null
            : <NonIdealState
                className={style.error}
                title="No Tournaments Created"
                visual="error"
              />}
          {tournaments.map(id => {
            const tournament: Tournament = tournamentInfo[id].attributes;
            return (
              <Link
                key={id}
                className={style.tournament}
                to={`tournaments/${id}`}
              >
                <div
                  className={`${style.card} ${Classes.CARD} ${Classes.INTERACTIVE}`}
                  key={id}
                >
                  <div>
                    <h3>
                      {tournament.name}
                    </h3>

                    <h5>
                      {tournament.location}
                    </h5>
                  </div>
                  {tournament.divisions.length
                    ? <div className={style.divisions}>
                        {(tournament.divisions || []).map((division, index) =>
                          <Tag key={index}>
                            {division.name}
                          </Tag>
                        )}
                      </div>
                    : null}
                </div>
              </Link>
            );
          })}
        </div>
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
