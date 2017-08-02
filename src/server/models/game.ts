import { Document, model, Schema } from "mongoose";
import User from "./user";

export interface Game {
  away: string;
  home: string;
  firstPull: string;
  location: string;
  owner: User;
}

export interface IGameModel extends Game, Document {}

export const GameSchema = new Schema({
  away: {
    index: true,
    required: true,
    type: String
  },
  firstPull: {
    required: true,
    type: String
  },
  home: {
    index: true,
    required: true,
    type: String
  },
  location: {
    type: String
  },
  owner: {
    index: true,
    ref: "User",
    required: true,
    type: Schema.Types.ObjectId
  }
});

export default model<IGameModel>("Game", GameSchema);
