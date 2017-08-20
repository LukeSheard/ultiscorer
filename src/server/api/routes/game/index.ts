import { Router } from "express";

import auth from "../../middleware/auth";

import get from "./get";
import getall from "./get-all";
import post from "./post";
import put from "./put";

const router = Router();

/*
  Public API routes
*/
router.post("/", auth, post);
router.get("/", getall);

router.get("/:id", get);
router.put("/:id", put);

export default router;
