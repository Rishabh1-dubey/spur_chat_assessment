import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { connectDB } from "./db";
import chatRoutes from "../src/routes/chat.route";

const app = express();

const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

connectDB();
app.use("/chat", chatRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
