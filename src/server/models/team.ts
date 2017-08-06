import { Document, model, Schema } from "mongoose";
import User from "./user";

interface NumberList {
  [num: number]: User;
}

interface TeamSchema {
  captains: User[];
  location: string;
  name: string;
  numbers: NumberList;
  owner: User;
  players: User[];
}

export default interface Team extends TeamSchema, Document {};

export const TeamSchema = new Schema({
  captains: [
    {
      index: true,
      ref: "User",
      type: Schema.Types.ObjectId
    }
  ],
  location: {
    default: "",
    type: String
  },
  name: {
    required: true,
    type: String
  },
  numbers: {
    default: {},
    type: Object
  },
  owner: {
    index: true,
    ref: "User",
    required: true,
    type: Schema.Types.ObjectId
  },
  players: [
    {
      index: true,
      ref: "User",
      type: Schema.Types.ObjectId
    }
  ]
});

export default model<Team>("Team", TeamSchema);
