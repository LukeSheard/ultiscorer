import { Request, Response } from "express";
// import mongoose from "../../../../../models/db";
import TeamSerializer from "../../../../../models/serialize/team";
import Team from "../../../../../models/team";

export default function(req: Request, res: Response) {
  return Team.find({
    club: req.params.id
  })
    .populate("players")
    .then(teams => {
      return res.json(TeamSerializer.serialize(teams));
    })
    .catch(error => {
      res.status(500);
      return res.json({
        error
      });
    });
}
