import { Request, Response } from "express";
import Club from "../../../../models/club";
import ClubSerializer from "../../../../models/serialize/club";

export default function(req: Request, res: Response) {
  return Club.findOne({ _id: req.params.id })
    .then(club => {
      if (!club) {
        throw Error("Not Found");
      }
      return res.json(ClubSerializer.serialize(club));
    })
    .catch(error => {
      res.status(500);
      return res.json({
        error
      });
    });
}
