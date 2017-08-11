import { Button, Classes, Intent } from "@blueprintjs/core";
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router";
import Team from "../../../../server/models/team";
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
          {loading}
          {teams.map(id => {
            const team: Team = teamInfo[id].attributes;
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
                      {team.location}
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
