import { IToastProps } from "@blueprintjs/core";
import { Action } from "redux";

export enum NOTIFICATION_ACTION_TYPES {
  CREATE = "NOTIFICATION_CREATE",
  CLOSE_ALL = "NOTIFICATION_CLOSEALL"
}

export interface INotificationAction extends Action {
  type: NOTIFICATION_ACTION_TYPES;
  payload?: IToastProps;
}

export type INotificationState = IToastProps[];
export const INITIAL_STATE = [] as INotificationState;

export function createNotification(payload: IToastProps): INotificationAction {
  return {
    payload,
    type: NOTIFICATION_ACTION_TYPES.CREATE
  };
}

export default function(
  state = INITIAL_STATE,
  action: INotificationAction
): INotificationState {
  switch (action.type) {
    case NOTIFICATION_ACTION_TYPES.CREATE: {
      return state.concat([action.payload as IToastProps]);
    }
    default: {
      return state;
    }
  }
}
