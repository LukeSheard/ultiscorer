import * as path from "path";
import { Genders } from "../../src//models/division";

/**
 * PUT THE NEW FILE NAME HERE
 */
const FILE_NAME = "tour1/games";
export const GENDER = Genders.Womens;
export const FILTER_BY_GENDER = false;

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

const TEAM_FILES = [
  "tour1/teams-a-men.json",
  "tour1/teams-b-men.json",
  "tour1/teams-c-men.json",
  "tour1/teams-women.json",
  "tour2/teams-a-s-men.json",
  "tour2/teams-b-n-men.json",
  "tour2/teams-b-s-men.json",
  "tour2/teams-c-s-men.json",
  "tour2/teams-women.json",
  "tour3/teams-a-s-men.json",
  "tour3/teams-b-n-men.json",
  "tour3/teams-b-s-men.json",
  "tour3/teams-c-s-men.json",
  "tour3/teams-women.json"
];

export const TEAMS = TEAM_FILES.reduce((acc, file) => {
  const teamList = require(path.join(BASE_PATH, file));
  const teams = !FILTER_BY_GENDER
    ? teamList
    : teamList.filter(team => team.gender === GENDER);

  return teams.reduce((accTeams, team) => {
    accTeams[team.name] = team;
    return accTeams;
  }, acc);
}, {});
