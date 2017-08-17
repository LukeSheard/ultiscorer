import { Request, Response } from "express";
import DivisionSerializer from "../../../../../models/serialize/division";
import Tournament from "../../../../../models/tournament";

export default function(req: Request, res: Response) {
  return Tournament.findOne({ _id: req.params.id })
    .populate("divisions")
    .then(tournament => {
      if (!tournament) {
        throw Error("Not Found");
      }
      return res.json(DivisionSerializer.serialize(tournament.divisions));
    })
    .catch(error => {
      res.status(500);
      return res.json({
        error
      });
    });
}
