import * as React from "react";
import { connect } from "react-redux";
import { IAppState } from "../reducers";

export class ErrorPage extends React.Component<any, any> {
  public render() {
    return <div>An Error Occurred</div>;
  }
}

export function mapStateToProps(state: IAppState) {
  return {
    sentry: state.routing && state.routing
  };
}

export default connect(mapStateToProps)(ErrorPage);
