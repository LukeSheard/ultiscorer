import { Router } from "express";

import get from "./get";
import getall from "./get-all";
import post from "./post";

const router = Router();

/*
  Public API routes
*/
router.post("/", post);
router.get("/", getall);

router.get("/:id", get);

export default router;
