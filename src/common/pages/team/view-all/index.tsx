import { Button, Classes, Intent, NonIdealState } from "@blueprintjs/core";
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router";
import Team from "../../../..//models/team";
import { IAppState } from "../../../reducers";
import saga from "./saga";
const style = require("./style.css");

export class TeamsView extends React.Component<any, any> {
  public render() {
    const { loading, teamInfo, teams } = this.props;

    if (loading) {
      return <div>Loading</div>;
    }

    return (
      <div>
        <div className={style.row}>
          <h1 className={style.title}>Teams</h1>
          <Link to="teams/new">
            <Button
              className={Classes.FILL}
              intent={Intent.PRIMARY}
              text="Create Team"
            />
          </Link>
        </div>
        <div className={style.teamView}>
          {teams.length
            ? null
            : <NonIdealState
                className={style.error}
                title="No Teams Created"
                visual="error"
              />}
          {teams.map(id => {
            const team: Team = teamInfo[id];
            return (
              <Link key={id} className={style.team} to={`teams/${id}`}>
                <div
                  className={`${style.card} ${Classes.CARD} ${Classes.INTERACTIVE}`}
                  key={id}
                >
                  <div>
                    <h3>
                      {team.name}
                    </h3>
                    <h5>
                      {team.gender}
                    </h5>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }
}

export const ConnectedTeamsView = connect((state: IAppState) => ({
  loading: state.team && state.team.loading,
  teamInfo: state.team && state.team.teams,
  teams: state.team && Object.keys(state.team.teams)
}))(TeamsView);

export default class TeamsPage extends React.Component<any, any> {
  public static saga = saga;

  public render() {
    return <ConnectedTeamsView />;
  }
}
