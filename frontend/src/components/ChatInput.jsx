import { useState } from "react";
import { IoIosSend } from "react-icons/io";
const ChatInput = ({ onSend, disabled }) => {
  const [value, setValue] = useState("");

  const handleSend = () => {
    if (!value.trim() || disabled) return;
    onSend(value.trim());
    setValue("");
  };

  return (
    <div className="p-3 border-t flex gap-2 bg-white">
      <input
        type="text"
        value={value}
        disabled={disabled}
        placeholder="Type a message..."
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        className="flex-1 border rounded-lg px-3 py-2 text-sm
                   focus:outline-none focus:ring-2 focus:ring-blue-400
                   disabled:bg-gray-100"
      />

      <button
        onClick={handleSend}
        disabled={disabled || !value.trim()}
        className={`px-4 rounded-lg text-sm transition
          ${
            disabled || !value.trim()
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
      >
        <IoIosSend />
      </button>
    </div>
  );
};

export default ChatInput;
