import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URL as string);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed", error);
  }
}
