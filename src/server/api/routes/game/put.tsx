import { Request, Response } from "express";
import Game from "../../../../models/game";
import GameSerializer from "../../../../models/serialize/game";

export default function(req: Request, res: Response) {
  const { actions } = req.body;
  return Game.findOne({ _id: req.params.id })
    .populate("home away division tournament")
    .then(game => {
      if (!game) {
        throw Error("Not Found");
      }

      game.actions = actions;
      return game.save();
    })
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
