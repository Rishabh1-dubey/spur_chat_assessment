import { useEffect, useRef, useState } from "react";
import Message from "./Message";
import ChatInput from "./ChatInput";
import { sendMessage, fetchChatHistory } from "../services/chatApi";

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [sessionId, setSessionId] = useState(localStorage.getItem("sessionId"));
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!sessionId) return;

    async function loadHistory() {
      try {
        const data = await fetchChatHistory(sessionId);
        setMessages(data.messages || []);
      } catch (error) {
        console.error("Failed to load history", error);
      }
    }

    loadHistory();
  }, [sessionId]);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (text) => {
    setMessages((prev) => [...prev, { sender: "user", text }]);
    setLoading(true);

    try {
      const data = await sendMessage(text, sessionId);

      setSessionId(data.sessionId);
      localStorage.setItem("sessionId", data.sessionId);

      setMessages((prev) => [...prev, { sender: "ai", text: data.reply }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md h-[600px] bg-white rounded-xl shadow-lg flex flex-col">
      <div className="p-4 border-b font-semibold text-center">
        Spur Support Assistance
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        {messages.map((msg, index) => (
          <Message key={index} sender={msg.sender} text={msg.text} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <ChatInput onSend={handleSend} disabled={loading} />
    </div>
  );
};

export default ChatWindow;
