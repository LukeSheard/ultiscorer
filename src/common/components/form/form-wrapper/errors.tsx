import { Classes } from "@blueprintjs/core";
import * as cx from "classnames";
import * as React from "react";
const style = require("./style.css");

export default class Errors extends React.Component<any, any> {
  public render() {
    const { errors } = this.props;
    return (
      <div className={cx(Classes.CALLOUT, Classes.INTENT_DANGER, style.error)}>
        <h5>Error</h5>
        {Object.values(errors).map((error, index) => {
          return (
            <p key={index}>
              {error}
            </p>
          );
        })}
      </div>
    );
  }
}
