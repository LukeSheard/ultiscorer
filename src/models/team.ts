import { Document, Schema } from "mongoose";
import { model } from "./db";
import { Genders } from "./division";
import User from "./user";

interface NumberList {
  [num: number]: User;
}

interface TeamSchema {
  gender: string;
  name: string;
  numbers: NumberList;
  players: User[];
}

export default interface Team extends TeamSchema, Document {};

export const TeamSchema = new Schema({
  club: {
    ref: "Club",
    type: Schema.Types.ObjectId
  },
  gender: {
    enum: Object.values(Genders),
    required: true,
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
