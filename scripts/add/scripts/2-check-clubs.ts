import * as fs from "fs";
import { CLUB_PATH, FILE_PATH, ObjectId } from "../settings";

const teams = require(FILE_PATH);
const clubs = require(CLUB_PATH);

const nameToClubId = clubs.reduce((acc, club) => {
  acc[club.name] = club._id;
  return acc;
}, {});

teams.forEach(team => {
  if (typeof team.club !== "string") {
    return;
  }

  if (nameToClubId[team.club]) {
    team.club = nameToClubId[team.club];
    return;
  }

  const newId = {
    $oid: ObjectId()
  };
  const newClub = {
    _id: newId,
    name: team.club,
    owner: {
      $oid: "598f07679a5d6fdee4ae8bcd"
    }
  };

  clubs.push(newClub);
  nameToClubId[team.club] = newId;
  team.club = newId;
});

fs.writeFileSync(FILE_PATH, JSON.stringify(teams, null, 2));
fs.writeFileSync(CLUB_PATH, JSON.stringify(clubs, null, 2));
