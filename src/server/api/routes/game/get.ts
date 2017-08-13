import { Request, Response } from "express";
import Game from "../../../../models/game";

export default function(req: Request, res: Response) {
  const { expand = [], ...query } = req.query;

  return Game.find(query)
    .populate(expand.join(" "))
    .then(games => {
      return res.json({
        data: games.map(game => ({
          attributes: game,
          id: game._id,
          type: "Game"
        }))
      });
    })
    .catch(error => {
      res.status(500);
      return res.json({
        error
      });
    });
}
