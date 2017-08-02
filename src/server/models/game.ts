import { Document, model, Schema } from "mongoose";
import Point from "./point";
import Team from "./team";
import User from "./user";

export default interface Game {
  away: Team;
  firstPull: Team;
  gameto: number;
  home: Team;
  owner: User;
  points: Point[];
};

export interface IGameModel extends Game, Document {}

export const GameSchema = new Schema({
  away: {
    index: true,
    ref: "Team",
    required: true,
    type: Schema.Types.ObjectId
  },
  firstPull: {
    index: true,
    ref: "Team",
    required: true,
    type: Schema.Types.ObjectId
  },
  gameto: {
    default: 15,
    type: Number
  },
  home: {
    index: true,
    ref: "Team",
    required: true,
    type: Schema.Types.ObjectId
  },
  owner: {
    index: true,
    ref: "User",
    required: true,
    type: Schema.Types.ObjectId
  },
  points: [
    {
      type: Point
    }
  ]
});

export default model<IGameModel>("Game", GameSchema);
