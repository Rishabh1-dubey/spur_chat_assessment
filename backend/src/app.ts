import express from "express";
import cors from "cors";
import { connectDB } from "./db";
import chatRoutes from "./routes/chat.route";

const app = express();

app.use(
  cors({
    origin: "https://spur-chat-assessment.vercel.app",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());
connectDB();

app.use("/chat", chatRoutes);

app.get("/", (_req, res) => {
  res.send("Backend is running");
});

export default app;
