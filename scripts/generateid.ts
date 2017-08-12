function MongoId() {
  const timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
  return (
    timestamp +
    "xxxxxxxxxxxxxxxx"
      .replace(/[x]/g, function() {
        return ((Math.random() * 16) | 0).toString(16);
      })
      .toLowerCase()
  );
}

MongoId();

import * as fs from "fs";
import * as path from "path";

const teams = require("./data/tour1/teams-women.json");
const clubs = require("./data/clubs.json");

const nameToClub = clubs.reduce((acc, club) => {
  acc[club.name] = club._id;
  return acc;
}, {});

teams.forEach(team => {
  if (nameToClub[team.club]) {
    team.club = nameToClub[team.club];
    return;
  }

  const newId = MongoId();
  const newClub = {
    _id: {
      $oid: newId
    },
    name: team.club,
    owner: {
      $oid: "598f07679a5d6fdee4ae8bcd"
    }
  };
  clubs.push(newClub);
  nameToClub[team.club] = {
    $oid: newId
  };
  team.club = {
    $oid: newId
  };
});

fs.writeFileSync(
  "./data/tour1/teams-womens.json",
  JSON.stringify(teams, null, 2)
);

fs.writeFileSync("./data/clubs.json", JSON.stringify(clubs, null, 2));
