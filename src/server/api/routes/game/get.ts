import { Request, Response } from "express";
import Game from "../../../../models/game";
import GameSerializer from "../../../../models/serialize/game";

export default function(req: Request, res: Response) {
  return Game.findOne({ _id: req.params.id })
    .populate("home away division tournament")
    .then(game => {
      if (!game) {
        throw Error("Not Found");
      }
      return res.json(GameSerializer.serialize(game));
    })
    .catch(error => {
      res.status(500);
      return res.json({
        error
      });
    });
}
