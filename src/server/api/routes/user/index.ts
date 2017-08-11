import { Router } from "express";

import auth from "../../middleware/auth";

import get from "./get";
import put from "./put";

const router = Router();

/*
  Public API routes
*/

/*
  Private Routes
*/
router.use(auth);
router.get("/", get);

router.put("/:id", put);

export default router;
