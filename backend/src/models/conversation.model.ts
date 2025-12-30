import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

export const Conversation = mongoose.model("Conversation", conversationSchema);
