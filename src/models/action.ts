import { Document, Schema } from "mongoose";
import { POINT_ACTIONS } from "../common/reducers/game";

export default interface Point {
  action: POINT_ACTIONS;
  time: Date;
};

export interface IPointModel extends Point, Document {}

export default new Schema({
  time: {
    required: true,
    type: Date
  },
  type: {
    enum: Object.values(POINT_ACTIONS),
    required: true,
    type: String
  }
});
