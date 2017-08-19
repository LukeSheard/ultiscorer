import { Router } from "express";

import put from "./put";

const router = Router();

/*
  Public API routes
*/
router.put("/:id", put);

export default router;
