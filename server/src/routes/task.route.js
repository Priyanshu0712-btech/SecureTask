import express from "express";

import { createTask, getTasks, getTask, updateTask,deleteTask } from "../controllers/task.controller.js";

import userAuth from "../middleware/userAuth.js";
import { validateTask } from "../middleware/validateTask.js";

const router = express.Router();

router.post("/", userAuth, validateTask, createTask);
router.get("/", userAuth, getTasks);
router.get("/:id", userAuth, getTask);
router.put("/:id", userAuth, updateTask);
router.delete("/:id", userAuth, deleteTask);

export default router;