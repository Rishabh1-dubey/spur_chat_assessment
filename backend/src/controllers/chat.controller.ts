import { Request, Response } from "express";
import { generateReply } from "../services/gemini.service";
import { Conversation } from "../models/conversation.model";
import { Message } from "../models/message.model";
import mongoose from "mongoose";

export const handleChatMessage = async (req: Request, res: Response) => {
  try {
    const { message, sessionId } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ error: "Message cannot be empty" });
    }

    let conversationId: mongoose.Types.ObjectId;

    // 1️⃣ Create or reuse conversation
    if (sessionId) {
      conversationId = new mongoose.Types.ObjectId(sessionId);
    } else {
      const conversation = await Conversation.create({});
      conversationId = conversation._id;
    }

    // 2️⃣ Save user message
    await Message.create({
      conversationId,
      sender: "user",
      text: message,
    });

    // 3️⃣ Fetch last messages for context (limit for cost control)
    const previousMessages = await Message.find({ conversationId })
      .sort({ timestamp: 1 })
      .limit(10);

    const history = previousMessages.map(
      (msg) => `${msg.sender.toUpperCase()}: ${msg.text}`
    );

    // 4️⃣ Generate AI reply
    const aiReply = await generateReply(history, message);

    // 5️⃣ Save AI message
    await Message.create({
      conversationId,
      sender: "ai",
      text: aiReply,
    });

    return res.json({
      reply: aiReply,
      sessionId: conversationId.toString(),
    });
  } catch (error) {
    console.error("Chat Error:", error);

    return res.status(500).json({
      reply:
        "Our support assistant is currently unavailable. Please try again later.",
    });
  }
};

//get the data
export const getChatHistory = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;

    // Validate Mongo ObjectId
    if (!mongoose.Types.ObjectId.isValid(sessionId)) {
      return res.status(400).json({
        error: "Invalid sessionId",
      });
    }

    const messages = await Message.find({
      conversationId: sessionId,
    })
      .sort({ timestamp: 1 })
      .select("sender text timestamp -_id");

    return res.json({ messages });
  } catch (error) {
    console.error("Fetch History Error:", error);

    return res.status(500).json({
      error: "Failed to fetch chat history",
    });
  }
};
