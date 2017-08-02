import { Document, model, Schema } from "mongoose";
import Team from "./team";
import User from "./user";

export default interface Point {
  score: User;
  assist: User;
  team: Team;
  turns: number;
};

export interface IPointModel extends Point, Document {}

export const pointSchema = new Schema({
  score:
})

export default model<IPointModel>("Point", pointSchema);
