import express from "express";
import { signUp, getUser } from "../controllers/authController.js";

const router = express.Router();
router.post("/signup", signUp);
router.get("user/:id", getUser);

export default router;

// localhost:3000/api/auth/user/65857668768768786876878687