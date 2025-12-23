import express from "express";
import { registerTeacher, loginTeacher } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", registerTeacher);
router.post("/login", loginTeacher);

export default router;
