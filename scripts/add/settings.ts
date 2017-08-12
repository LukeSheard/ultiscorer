import * as path from "path";
import { Genders } from "../../src/server/models/division";

/**
 * PUT THE NEW FILE NAME HERE
 */
const FILE_NAME = "tour2/teams-b-s-men";
export const GENDER = Genders.Mens;

const BASE_PATH = path.join(__dirname, "../data");
export const FILE_PATH = path.join(BASE_PATH, FILE_NAME + ".json");
export const CLUB_PATH = path.join(BASE_PATH, "clubs.json");

export function ObjectId() {
  const timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
  return (
    timestamp +
    "xxxxxxxxxxxxxxxx"
      .replace(/[x]/g, () => ((Math.random() * 16) | 0).toString(16))
      .toLowerCase()
  );
}
