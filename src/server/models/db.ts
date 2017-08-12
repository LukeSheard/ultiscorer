import * as mongoose from "mongoose";
import * as timestamp from "mongoose-plugin-timestamp";
import * as unique from "mongoose-unique-validator";

(mongoose as typeof mongoose).Promise = global.Promise;

export function model<T extends mongoose.Document>(
  name: string,
  schema: mongoose.Schema
) {
  schema.plugin(timestamp);
  schema.plugin(unique);

  return mongoose.model<T>(name, schema);
}

export default mongoose;
