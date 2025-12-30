import express from "express";
import cors from "cors";
import { connectDB } from "./db";
import chatRoutes from "./routes/chat.route";

const app = express();

app.use(cors());
app.use(express.json());

// IMPORTANT: connect DB, but DO NOT listen
connectDB();

app.use("/chat", chatRoutes);

export default app;
