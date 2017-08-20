import { Document, Schema } from "mongoose";
import { model } from "./db";
import Team from "./team";
import Tournament from "./tournament";

export enum Genders {
  Mens = "Mens",
  Womens = "Womens",
  Open = "Open",
  Mixed = "Mixed",
  Boys = "Boys",
  Girls = "Girls"
}

export interface DivisionSchema {
  gender: Genders;
  name: string;
  teams: Team[];
  tournament: Tournament;
}

export default interface Division extends DivisionSchema, Document {};

export const DivisionSchema = new Schema({
  gender: {
    enum: Object.values(Genders),
    required: true,
    type: String
  },
  name: {
    required: true,
    type: String
  },
  teams: [
    {
    ref: "Team",
    type: Schema.Types.ObjectId
    }
  ],
  tournament: {
    ref: "Tournament",
    type: Schema.Types.ObjectId
  }
});

export default model<Division>("Division", DivisionSchema);
