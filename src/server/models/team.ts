import { Document, model, Schema } from "mongoose";
import User from "./user";

interface NumberList {
  [num: number]: User;
}

interface TeamSchema {
  owner: User;
  captains: User[];
  players: User[];
  numbers: NumberList;
  name: string;
}

export default interface Team extends TeamSchema, Document {};

export const TeamSchema = new Schema({
  name: {
    required: true,
    type: String
  },
  tournament: {
    ref: "Tournament",
    required: true,
    type: Schema.Types.ObjectId
  }
});

export default model<Team>("Team", TeamSchema);
