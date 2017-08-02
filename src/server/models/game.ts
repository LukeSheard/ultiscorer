import { Document, model, Schema } from "mongoose";
import Division from "./division";
import Point from "./point";
import Team from "./team";
import Tournament from "./tournament";
import User from "./user";

export default interface Game {
  away: Team;
  division: Division;
  firstPull: Team;
  gameto: number;
  home: Team;
  owner: User;
  points: Point[];
  tournament: Tournament;
};

export interface IGameModel extends Game, Document {}

export const GameSchema = new Schema({
  away: {
    index: true,
    ref: "Team",
    required: true,
    type: Schema.Types.ObjectId
  },
  division: {
    ref: "Division",
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
  points: [Point],
  tournament: {
    ref: "Tournament",
    required: true,
    type: Schema.Types.ObjectId
  }
});

export default model<IGameModel>("Game", GameSchema);
