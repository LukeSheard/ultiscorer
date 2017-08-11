import * as bcrypt from "bcrypt";
import { Document, model, Schema } from "mongoose";

export interface UserSchema {
  email: string;
  name: string;
  password: string;
  ukuusername: string;
}

export default interface User extends UserSchema, Document {
  comparePassword(password: string): Promise<User>;
};

export const UserSchema = new Schema({
  email: {
    index: {
      unique: true
    },
    required: true,
    type: String
  },
  name: {
    required: true,
    type: String
  },
  password: {
    required: true,
    select: false,
    type: String,
    set(value) {
      const salt = bcrypt.genSaltSync(10);
      return bcrypt.hashSync(value, salt);
    }
  },
  ukuusername: {
    default: "",
    type: String
  }
});

UserSchema.methods.comparePassword = function(password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, (err, isMatch) => {
      if (err) {
        return reject(err);
      }

      if (isMatch) {
        return resolve(this);
      }

      return reject(false);
    });
  });
};

export default model<User>("User", UserSchema);
