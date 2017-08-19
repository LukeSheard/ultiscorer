import { Router } from "express";

import teams from "./relationships/teams";

const router = Router();

/*
  Public API routes
*/

router.get("/:id/relationships/teams", teams);

export default router;
