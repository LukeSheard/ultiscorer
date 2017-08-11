export { default as saga } from "./saga";

import * as React from "react";
import { connect } from "react-redux";
import { IAppState } from "../../../reducers";

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
