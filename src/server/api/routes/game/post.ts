import { Request, Response } from "express";
import Game from "../../../../models/game";
import GameSerializer from "../../../../models/serialize/game";
import User from "../../../../models/user";

export default function(req: Request, res: Response) {
  const { away, division, firstPull, home } = req.body;
  const { user } = res.locals;

  return new Game({
    away,
    division,
    firstPull,
    home,
    owner: (user as User).id
  })
    .save()
    .then(game => {
      return res.json(GameSerializer.serialize(game));
    })
    .catch(error => {
      res.status(500);
      return res.json({
        error
      });
    });
}
