import { Request, Response } from "express";
import Club from "../../../../models/club";
import ClubSerializer from "../../../../models/serialize/club";

export default function(req: Request, res: Response) {
  const { filter = {} } = req.query;

  return Club.find(filter)
    .then(clubs => {
      return res.json(ClubSerializer.serialize(clubs));
    })
    .catch(error => {
      res.status(500);
      return res.json({
        error
      });
    });
}
