import { Request, Response } from "express";
import TournamentSerializer from "../../../../models/serialize/tournament";
import Tournament from "../../../../models/tournament";
import User from "../../../../models/user";

export default function(req: Request, res: Response) {
  const { name, location, description, startDate, endDate } = req.body;
  const { user } = res.locals;

  const document = new Tournament({
    description,
    endDate: new Date(endDate),
    location,
    name,
    owner: (user as User).id,
    startDate: new Date(startDate)
  });

  return document
    .save()
    .then(tournament => {
      return res.json(TournamentSerializer.serialize(tournament));
    })
    .catch(error => {
      res.status(500);
      return res.json({
        error
      });
    });
}
