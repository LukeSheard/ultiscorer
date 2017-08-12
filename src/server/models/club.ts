import { Document, Schema } from "mongoose";
import { model } from "./db";
import Team from "./team";
import User from "./user";

interface ClubSchema {
  location: string;
  name: string;
  owner: User;
  teams: Team[];
}

export default interface Club extends ClubSchema, Document {};

export const ClubSchema = new Schema({
  location: {
    default: "",
    type: String
  },
  name: {
    required: true,
    type: String
  },
  owner: {
    ref: "User",
    required: true,
    type: Schema.Types.ObjectId
  },
  teams: [
    {
      ref: "Team",
      type: Schema.Types.ObjectId
    }
  ]
});

export default model<Club>("Club", ClubSchema);
