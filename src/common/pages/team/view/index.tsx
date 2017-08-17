export { default as saga } from "./saga";

import * as React from "react";
import { connect } from "react-redux";
import Team from "../../../..//models/team";
import { IAppState } from "../../../reducers";

export interface ITeamViewProps extends React.Props<TeamsView> {
  team?: Team;
  loading: boolean;
}

export class TeamsView extends React.Component<any, any> {
  public render() {
    const { children, loading, team } = this.props;

    if (loading) {
      return <div>Loading</div>;
    }
    return (
      <div>
        <h1>
          {team && team.name}
        </h1>
        <h3>
          {team && team.gender}
        </h3>
        <div>
          {children}
        </div>
      </div>
    );
  }
}

export default connect((state: IAppState) => {
  const props: ITeamViewProps = {
    loading: state.team && state.team.loading
  };

  const current = state.team.selected;
  if (current) {
    props.team = state.team.teams[current];
  }

  return props;
})(TeamsView);
