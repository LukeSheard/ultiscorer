import * as bcrypt from "bcrypt";
import { Document, model, Schema } from "mongoose";

export interface User {
  email: string;
  password: string;
}

export interface IUserModel extends User, Document {
  comparePassword(password: string): Promise<IUserModel>;
}

export const UserSchema = new Schema({
  email: {
    index: {
      unique: true
    },
    required: true,
    type: String
  },
  password: {
    required: true,
    select: false,
    type: String
  }
});

UserSchema.pre("save", function(next) {
  if (!this.isModified("password")) {
    return next();
  }

  bcrypt.genSalt(10, (saltErr, salt) => {
    if (saltErr) {
      return next(saltErr);
    }

    bcrypt.hash(this.password, salt, (hashErr, hash) => {
      if (hashErr) {
        return next(hashErr);
      }

      this.password = hash;
      next();
    });
  });
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

export default model<IUserModel>("User", UserSchema);
