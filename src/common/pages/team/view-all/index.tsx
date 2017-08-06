import { Classes } from "@blueprintjs/core";
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router";
import Team from "../../../../server/models/team";
import { IAppState } from "../../../reducers";
import saga from "./saga";

export class TeamsView extends React.Component<any, any> {
  public render() {
    const { loading, teamInfo, teams } = this.props;

    if (loading) {
      return <div>Loading</div>;
    }

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
        {teams.map(id => {
          const team: Team = teamInfo[id].attributes;
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
                <Link to={`teams/${id}`}>
                  <h3>
                    {team.name}
                  </h3>
                </Link>
                <h5>
                  {team.location}
                </h5>
              </div>
            </div>
          );
        })}
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
