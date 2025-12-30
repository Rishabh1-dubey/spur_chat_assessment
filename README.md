# Spur Chat Assessment 🤖

Spur Chat Assessment is an AI-powered customer support chatbot built as a technical assessment project. The goal of this project is to demonstrate my ability to design, build, and deploy a full-stack application using modern web technologies and AI integration.

The application simulates a customer support agent for an e-commerce store and responds to user queries related to shipping, returns, and general support using context-aware AI responses powered by Google Gemini.

---

## 🎯 Purpose of This Project

This project was built to demonstrate:

- Full-stack application design using the MERN stack
- Clean separation of frontend, backend, and AI services
- Session-based conversation handling
- Real-world API integration with an AI model
- Deployment-ready architecture using Vercel

---

## 🚀 Key Features

- **AI-Powered Customer Support**  
  Uses Google Gemini (`gemini-2.5-flash`) to generate intelligent and contextual responses.

- **Session-Based Chat**  
  Each conversation is tied to a session ID to maintain context.

- **Persistent Chat History**  
  Conversations are stored in MongoDB for continuity and future retrieval.

- **Fast & Responsive UI**  
  Built using React, Vite, and Tailwind CSS.

- **Scalable Backend Architecture**  
  Express + TypeScript with a service layer for AI integration.

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Vite
- Tailwind CSS

### Backend

- Node.js
- Express.js
- TypeScript
- MongoDB (Mongoose)
- Google GenAI SDK (Gemini)

### Deployment

- Vercel (Frontend & Backend)

---

## 📂 Project Structure

```bash
├── backend/
│   ├── src/
│   │   ├── controllers/   # Request handling logic
│   │   ├── db/            # MongoDB connection
│   │   ├── routes/        # API routes
│   │   ├── services/      # Gemini AI integration
│   │   └── index.ts       # Application entry point
│   └── vercel.json        # Vercel deployment config
│
├── frontend/
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── services/      # API service layer
│   │   └── App.jsx
│   └── tailwind.config.js

PORT=3000
MONGODB_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/spur_chat
GEMINI_API_KEY=your_google_gemini_api_key


## Frontend (Vercel Environment Variables)
VITE_API_URL=https://your-backend-url.vercel.app

# 1. Clone the Repository
git clone <your-repo-url>
cd spur_chat_assessment
# . Backend Setup
cd backend
npm install
npm run dev

# Frontend Setup
cd ../frontend
npm install
npm run dev

# POST /chat/message
{
  "sessionId": "unique-session-id",
  "message": "What is your return policy?"
}
# Returns an AI-generated response based on the conversation context.
```
