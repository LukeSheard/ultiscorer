import { Document, Schema } from "mongoose";
import { model } from "./db";
import Division from "./division";
import User from "./user";

export interface TournamentSchema {
  endDate: Date;
  owner: User;
  name: string;
  location: string;
  divisions: Division[];
  description: string;
  startDate: Date;
}

export default interface Tournament extends TournamentSchema, Document {};

export const TournamentSchema = new Schema({
  description: {
    default: "",
    type: String
  },
  divisions: [
    {
      ref: "Division",
      type: Schema.Types.ObjectId
    }
  ],
  endDate: {
    index: true,
    required: true,
    type: Date
  },
  location: {
    required: true,
    type: String
  },
  name: {
    index: true,
    required: true,
    type: String
  },
  owner: {
    ref: "User",
    required: true,
    type: Schema.Types.ObjectId
  },
  startDate: {
    index: true,
    required: true,
    type: Date
  }
});

export default model<Tournament>("Tournament", TournamentSchema);
