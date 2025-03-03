import express from "express";
import { signUp, getUser } from "../controllers/authController.js";

const router = express.Router();
router.post("/signup", signUp);
router.get("/:id", getUser);

export default router;
