import { Document, model, Schema } from "mongoose";
import Team from "./team";

export interface DivisionSchema {
  name: string;
  teams: Team[];
}

export default interface Division extends DivisionSchema, Document {};

export const DivisionSchema = new Schema({
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
