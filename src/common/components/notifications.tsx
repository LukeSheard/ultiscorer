import { Position, Toaster } from "@blueprintjs/core";
import * as React from "react";
import { connect } from "react-redux";
import { IAppState } from "../reducers";

export class Notifications extends React.Component<any, {}> {
  private toaster: Toaster;

  constructor(props, ctx) {
    super(props, ctx);
    this.toastHandler = this.toastHandler.bind(this);
  }

  public componentWillReceiveProps(nextProps) {
    if (this.toaster && nextProps.notification) {
      this.toaster.show(nextProps.notification);
    }
  }

  public render() {
    return <Toaster position={Position.BOTTOM_RIGHT} ref={this.toastHandler} />;
  }

  private toastHandler(ref: Toaster): void {
    this.toaster = ref;
  }
}

export function mapStateToProps(state: IAppState) {
  return {
    notification:
      state.notifications &&
      state.notifications.slice(-1) &&
      state.notifications.slice(-1)[0]
  };
}

export default connect(mapStateToProps)(Notifications);
