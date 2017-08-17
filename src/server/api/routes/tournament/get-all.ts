import { Request, Response } from "express";
import TournamentSerializer from "../../../../models/serialize/tournament";
import Tournament from "../../../../models/tournament";

export default function(req: Request, res: Response) {
  const { filter = {} } = req.query;

  return Tournament.find(filter)
    .populate("divisions")
    .then(tournaments => {
      return res.json(TournamentSerializer.serialize(tournaments));
    })
    .catch(error => {
      res.status(500);
      return res.json({
        error
      });
    });
}
