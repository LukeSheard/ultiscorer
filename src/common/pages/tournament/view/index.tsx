export { default as saga } from "./saga";

import { Button, Classes, Intent } from "@blueprintjs/core";
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router";
import { IAppState } from "../../../reducers";

export class TournamentsView extends React.Component<any, any> {
  public render() {
    const { children, loading, loggedin, tournament } = this.props;

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
        {loggedin
          ? <Link to={`tournaments/${this.props.params.id}/edit`}>
            <Button
              className={Classes.FILL}
              intent={Intent.PRIMARY}
              text="Edit Tournament"
            />
          </Link>
        : null}
        <div>
          {children}
        </div>
      </div>
    );
  }
}

export default connect((state: IAppState) => {
  const props: any = {
    loading: state.tournament && state.tournament.loading,
    loggedin: state.user && state.user.token
  };

  const current = state.tournament && state.tournament.selected;
  if (current) {
    props.tournament =
      state.tournament && state.tournament.tournaments[current].attributes;
  }

  return props;
})(TournamentsView);
