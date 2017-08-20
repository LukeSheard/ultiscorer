import { Document, Schema } from "mongoose";
import Team from "./team";
import User from "./user";

export default interface Point {
  score: User;
  assist: User;
  team: Team;
  turns: number;
};

export interface IPointModel extends Point, Document {}

export default new Schema({
  assist: {
    ref: "User",
    required: true,
    type: Schema.Types.ObjectId
  },
  score: {
    ref: "User",
    required: true,
    type: Schema.Types.ObjectId
  },
  team: {
    ref: "Team",
    required: true,
    type: Schema.Types.ObjectId
  },
  turns: {
    default: 0,
    type: Number
  }
});
