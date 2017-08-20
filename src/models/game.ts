import { Document, Schema } from "mongoose";
import Action from "./action";
import { model } from "./db";
import Division from "./division";
import Team from "./team";
import Tournament from "./tournament";
import User from "./user";

export interface Game {
  actions: Action[];
  away: Team;
  division: Division;
  firstPull: Team;
  home: Team;
  owner: User;
  tournament: Tournament;
}

export default interface IGameModel extends Game, Document {};

export const GameSchema = new Schema({
  actions: {
    default: [],
    type: [Action]
  },
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
  tournament: {
    ref: "Tournament",
    required: true,
    type: Schema.Types.ObjectId
  }
});

export default model<IGameModel>("Game", GameSchema);
