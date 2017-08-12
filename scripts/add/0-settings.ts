import * as path from "path";

/**
 * PUT THE NEW FILE NAME HERE
 */
const FILE_NAME = "tour1/teams-a-men";

const BASE_PATH = path.join(__dirname, "../");
export const FILE_PATH = path.join(BASE_PATH, FILE_NAME + ".json");
export const CLUB_PATH = path.join(BASE_PATH, "clubs.json");

export function ObjectId() {
  const timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
  return timestamp + "xxxxxxxxxxxxxxxx".replace(/[x]/g, () => ((Math.random() * 16) | 0).toString(16)).toLowerCase();
}
