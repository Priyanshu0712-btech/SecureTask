import express from "express";
import { signup, login, logout, isAuthenticated } from "../controllers/auth.controller.js"
import userAuth from "../middleware/userAuth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/is-auth", userAuth, isAuthenticated);

export default router;