import { Request, Response } from "express";
import Game from "../../../models/tournament";
import User from "../../../models/user";

export default function(req: Request, res: Response) {
  const { away, division, firstPull, gameto, home, tournament } = req.body;
  const { user } = res.locals;

  const document = new Game({
    away,
    division,
    firstPull,
    gameto,
    home,
    owner: (user as User).id,
    tournament
  });

  return document
    .save()
    .then(game => {
      return res.json({
        data: {
          attributes: game,
          id: game._id,
          type: "Game"
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
