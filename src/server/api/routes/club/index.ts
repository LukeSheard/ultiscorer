import { Router } from "express";

import get from "./get";
import getall from "./get-all";
import post from "./post";

import teams from "./relationships/teams";

const router = Router();

/*
  Public API routes
*/
router.post("/", post);
router.get("/", getall);

router.get("/:id", get);
router.get("/:id/relationships/teams", teams);

export default router;
