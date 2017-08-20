import { Router } from "express";

import auth from "../../middleware/auth";

import get from "./get";
import getall from "./get-all";
import post from "./post";
import put from "./put";

import divisions from "./relationships/divisions";
import teams from "./relationships/teams";

const router = Router();

/*
  Public API routes
*/
router.post("/", auth, post);
router.get("/", getall);

router.get("/:id", get);
router.put("/:id", put);

router.get("/:id/relationships/divisions", divisions);
router.get("/:id/relationships/teams", teams);

export default router;
