import { Request, Response } from "express";
import Division from "../../../../../models/division";
import TeamSerializer from "../../../../../models/serialize/team";

export default function(req: Request, res: Response) {
  return Division.findOne({ _id: req.params.id })
    .populate("teams")
    .then(division => {
      if (!division) {
        throw Error("Division not found");
      }
      res.json(TeamSerializer.serialize(division.teams));
    })
    .catch(error => {
      res.status(500);
      return res.json({
        error
      });
    });
}
