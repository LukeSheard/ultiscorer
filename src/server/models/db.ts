import * as mongoose from "mongoose";
(mongoose as typeof mongoose).Promise = global.Promise;

export default mongoose;
