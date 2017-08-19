import * as React from "react";
import { connect } from "react-redux";
import { IAppState } from "../reducers";

interface ErrorPageProps extends React.Props<ErrorPage> {
  sentry: string;
}

export class ErrorPage extends React.Component<ErrorPageProps, {}> {
  public render() {
    const { sentry } = this.props;
    return (
      <div>
        <h1>An Error Occurred</h1>
        <h3>
          {sentry}
        </h3>
      </div>
    );
  }
}

export function mapStateToProps(state: IAppState) {
  return {
    sentry: state.routing.locationBeforeTransitions.query.sentry
  };
}

export default connect(mapStateToProps)(ErrorPage);
