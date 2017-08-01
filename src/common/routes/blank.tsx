import * as React from "react";

export default class BlankRoute extends React.Component<any, {}> {
  public render() {
    return (
      <div>
        <span>
          {JSON.stringify(this.props)}
        </span>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}
