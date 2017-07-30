import * as React from "react";

export interface ErrorProps extends React.Props<ErrorOccured> {
  error: Error;
}

export default class ErrorOccured extends React.Component<ErrorProps, {}> {
  public render() {
    const { error } = this.props;
    return (
      <div>
        <h1>An Error Occured</h1>
        <h2>
          {error.message}
        </h2>
      </div>
    );
  }
}
