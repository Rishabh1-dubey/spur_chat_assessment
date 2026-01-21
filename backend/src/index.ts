import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { connectDB } from "./db";

// Add this block to allow local execution
const PORT = process.env.PORT || 8000;

const startServer = async () => {
  await connectDB();
  if (require.main === module) {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }
};

startServer();

export default app;
