import { Request, Response } from "express";
import Game from "../../../../models/game";
import GameSerializer from "../../../../models/serialize/game";

export default function(req: Request, res: Response) {
  const { filter = {} } = req.query;
  return Game.find(filter)
    .populate("home away division tournament")
    .then(games => {
      return res.json(GameSerializer.serialize(games));
    })
    .catch(error => {
      res.status(500);
      return res.json({
        error
      });
    });
}
