import { Request, Response } from "express";
import Tournament from "../../../models/tournament";

export default function(req: Request, res: Response) {
  const { expand = [], ...query } = req.query;

  return Tournament.find(query)
    .populate(expand.join(" "))
    .then(tournaments => {
      return res.json({
        data: tournaments.map(tournament => ({
          attributes: tournament,
          id: tournament._id,
          type: "Tournament"
        }))
      });
    })
    .catch(error => {
      res.status(500);
      return res.json({
        error
      });
    });
}
