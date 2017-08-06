import { Router } from "express";

import auth from "../../middleware/auth";

import get from "./get";
import post from "./post";

import getdivisions from "./relationships/divisions";
import getgames from "./relationships/games";

const router = Router();

/*
  Public API routes
*/
router.get("/", get);
router.get("/:tournament/divisions", getdivisions);
router.get("/:tournament/games", getgames);

/*
  Private Routes
*/
router.use(auth);
router.post("/", post);

export default router;
