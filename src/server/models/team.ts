import { Document, Schema } from "mongoose";
import { model } from "./db";
import { Genders } from "./division";
import User from "./user";

interface NumberList {
  [num: number]: User;
}

interface TeamSchema {
  name: string;
  numbers: NumberList;
  players: User[];
}

export default interface Team extends TeamSchema, Document {};

export const TeamSchema = new Schema({
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
  players: [
    {
      index: true,
      ref: "User",
      type: Schema.Types.ObjectId
    }
  ]
});

export default model<Team>("Team", TeamSchema);
