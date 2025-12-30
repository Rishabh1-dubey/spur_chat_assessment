import dotenv from "dotenv";
dotenv.config();

import app from "./app";

// Add this block to allow local execution
const PORT = process.env.PORT || 8000;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;
