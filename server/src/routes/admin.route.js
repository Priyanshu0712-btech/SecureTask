import express from "express";
import userAuth from "../middleware/userAuth.js";
import { isAdmin } from "../middleware/roleMiddleware.js";

import {
  getAllUsers,
  deleteUser,
  getTasks,
} from "../controllers/admin.controller.js";

const router = express.Router();

router.use(userAuth);
router.use(isAdmin);

router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);
router.get("/tasks", getTasks);

export default router;
