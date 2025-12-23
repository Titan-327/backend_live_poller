import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { createPoll,startPoll,endPoll } from "../controllers/poll.controller.js";
import { getPollById } from "../controllers/poll.controller.js";
import { getMyPolls } from "../controllers/poll.controller.js";

const router = express.Router();


router.get("/my-polls", authMiddleware, getMyPolls);

router.post("/create", authMiddleware, createPoll);
router.put("/start/:pollId", authMiddleware, startPoll);
router.put("/end/:pollId", authMiddleware, endPoll);
router.get("/:pollId", getPollById);
export default router;
