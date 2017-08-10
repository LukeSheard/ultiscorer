export { default as saga } from "./saga";

import * as React from "react";
import { connect } from "react-redux";
import { IAppState } from "../../../reducers";

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
          {team && team.location}
        </h3>
        <div>
          {children}
        </div>
      </div>
    );
  }
}

export default connect((state: IAppState) => {
  const props: any = {
    loading: state.team && state.team.loading
  };

  const current = state.team && state.team.selected;
  if (current) {
    props.team = state.team && state.team.teams[current].attributes;
  }

  return props;
})(TeamsView);
