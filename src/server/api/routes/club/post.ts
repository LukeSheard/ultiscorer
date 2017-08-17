import { Request, Response } from "express";
import Club from "../../../../models/club";
import ClubSerializer from "../../../../models/serialize/club";

export default function(req: Request, res: Response) {
  const { name, location } = req.body;
  const { user } = res.locals;

  return new Club({
    location,
    name,
    owner: user
  })
    .save()
    .then(club => {
      return res.json(ClubSerializer.serialize(club));
    })
    .catch(error => {
      res.status(500);
      return res.json({
        error
      });
    });
}
