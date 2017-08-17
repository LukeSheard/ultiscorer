import { Request, Response } from "express";
import Division from "../../../../../models/division";
import TeamSerializer from "../../../../../models/serialize/team";
import Team from "../../../../../models/team";
import Tournament from "../../../../../models/tournament";

export default function(req: Request, res: Response) {
  return Tournament.findOne({ _id: req.params.id })
    .populate("divisions")
    .then(tournament => {
      if (!tournament) {
        throw Error("Not Found");
      }
      return Division.populate(tournament.divisions, {
        path: "teams"
      });
    })
    .then(divisions => {
      const teams = divisions.reduce(
        (acc, division) => acc.concat(division.teams),
        [] as Team[]
      );
      return res.json(TeamSerializer.serialize(teams));
    })
    .catch(error => {
      res.status(500);
      return res.json({
        error
      });
    });
}
