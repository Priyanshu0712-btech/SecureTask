import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import taskRoutes from "./routes/task.route.js";
import adminRoutes from "./routes/admin.route.js";

const app = express();
const PORT = process.env.PORT;

const __dirname = path.resolve(); 

const allowedOrigins = [process.env.CLIENT_URL];

app.use(express.json());  
app.use(cookieParser());
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));



app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/tasks", taskRoutes);
app.use("/api/v1/admin", adminRoutes);


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // Sends the frontend's built index.html file to the client for rendering the app
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
})