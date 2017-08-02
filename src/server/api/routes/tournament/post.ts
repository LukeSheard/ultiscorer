import { Request, Response } from "express";
import Tournament from "../../../models/tournament";
import User from "../../../models/user";

export default function(req: Request, res: Response) {
  const { name, location } = req.body;
  const { user } = res.locals;

  const document = new Tournament({
    location,
    name,
    owner: (user as User).id
  });

  return document
    .save()
    .then(tournament => {
      return res.json({
        data: {
          attributes: tournament,
          id: tournament._id,
          type: "Tournament"
        }
      });
    })
    .catch(error => {
      res.status(500);
      return res.json({
        error
      });
    });
}
