import * as React from "react";
import { connect } from "react-redux";
import { IAppState } from "../../../reducers";

export class TournamentsView extends React.Component<any, any> {
  public render() {
    const { loading, tournament } = this.props;

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
      </div>
    );
  }
}

export const ConnectedTournamentsView = connect((state: IAppState) => {
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

export default class TournamentsPage extends React.Component<any, any> {
  public render() {
    return <ConnectedTournamentsView />;
  }
}
