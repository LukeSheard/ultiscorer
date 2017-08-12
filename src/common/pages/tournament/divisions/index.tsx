import * as React from "react";
import { connect } from "react-redux";
import { IAppState } from "../../../reducers";

export class TournamentsView extends React.Component<any, any> {
  public render() {
    return <div>Hello</div>;
  }
}

export function mapStateToProps(state: IAppState) {
  const props: any = {
    loading: state.tournament && state.tournament.loading
  };

  return props;
}

export default connect(mapStateToProps)(TournamentsView);
