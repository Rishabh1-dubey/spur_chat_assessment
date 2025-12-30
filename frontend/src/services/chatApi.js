export async function sendMessage(message, sessionId) {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/chat/message`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, sessionId }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to send message");
  }

  return response.json();
}
export async function fetchChatHistory(sessionId) {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/chat/history/${sessionId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch chat history");
  }

  return response.json();
}
