import * as jwt from "jsonwebtoken";
import config from "../../../config";
import User from "../models/user";

export interface JWTTokenPayload {
  user: User;
}

export function decode(token) {
  return new Promise<JWTTokenPayload>((resolve, reject) => {
    return jwt.verify(
      token,
      config.COOKIE_SECRET,
      {
        algorithms: ["HS256"]
      },
      (error, payload: any) => {
        if (error) {
          return reject(Promise.resolve(error));
        }

        if (!payload || !payload.user) {
          return reject(Promise.resolve("Unknown token"));
        }

        return resolve(Promise.resolve(payload));
      }
    );
  });
}
