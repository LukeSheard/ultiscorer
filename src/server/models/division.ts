import { Document, Schema } from "mongoose";
import { model } from "./db";
import Team from "./team";

export interface DivisionSchema {
  name: string;
  teams: Team[];
}

export enum Genders {
  Boys = "Boys",
  Girls = "Girls",
  Mens = "Mens",
  Womens = "Womens",
  Open = "Open",
  Mixed = "Mixed"
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
  ]
});

export default model<Division>("Division", DivisionSchema);
