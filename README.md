# Muscle Fuel ⚡ Backend

The robust, AI-powered backend engine for **Muscle Fuel** — a premium, agentic AI fitness platform designed to generate precision-engineered workout protocols and provide intelligent fitness assistance.

## 🚀 Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js (v5)
- **Language:** TypeScript
- **Database:** MongoDB & Mongoose
- **Authentication:** [Better Auth](https://better-auth.com/) + JWT (`jose-cjs`)
- **AI Integration:** Google Gemini (`@google/genai`)

## ✨ Key Features

- **Agentic AI Protocol Generation:** Integrates directly with Gemini 3.5 Flash to dynamically generate strictly structured JSON workout routines based on user limitations, equipment, and experience levels.
- **Context-Aware AI Chat Assistant:** A smart conversational endpoint that ingests the active routine context to provide tailored fitness advice and modifications.
- **Cryptographic Security (Zero Trust):** Uses `jose-cjs` to cryptographically verify JWT session tokens (issued by Better Auth) on all protected routes, ensuring bulletproof data scoping (users can only access their own protocols).
- **NoSQL Architecture:** Leverages MongoDB for flexible, highly scalable document storage of user profiles, routines, and AI-generated plans.

## 🛠️ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas URI)
- [Google Gemini API Key](https://aistudio.google.com/app/apikey)

### Installation

1. Clone the repository and navigate to the backend directory:
   ```bash
   cd muscle-fuel-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and configure the following variables:
   ```env
   PORT=5000
   DB_NAME=muscle-fuel
   MONGO_URI=mongodb+srv://<user>:<password>@cluster...
   BETTER_AUTH_SECRET=your_super_secret_key_here
   BETTER_AUTH_URL=http://localhost:5000
   CLIENT_URL=http://localhost:5173
   GOOGLE_CLIENT_ID=your_google_oauth_client_id
   GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
   GEMINI_API_KEY=your_gemini_api_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## 📂 Project Structure

```text
src/
├── config/           # Database connection logic
├── controllers/      # API route controllers (AI, Plans, Profile, Manage, Routines)
├── middlewares/      # Custom Express middlewares (e.g., JWT authMiddleware)
├── models/           # Mongoose schemas (UserPlan, Routine, UserProfile)
├── routes/           # Express route definitions
├── types.d.ts        # Global TypeScript overrides (Express Request)
├── auth.ts           # Better Auth configuration (JWT Plugin + MongoDB Adapter)
└── index.ts          # Express application entry point
```

## 🔒 Authentication Flow
Muscle Fuel utilizes a modern authentication pipeline:
1. The frontend authenticates via **Better Auth** (Email/Password or Google OAuth).
2. The `jwt()` plugin within `auth.ts` instructs Better Auth to cryptographically sign a JSON Web Token and issue it to the client via a secure cookie.
3. For protected API routes, the custom `authMiddleware` intercepts the request, extracts the token, and verifies it using `jose-cjs`. 
4. The decoded user ID is attached to the Express `req.user` object, ensuring downstream controllers naturally scope all database queries to the authenticated user.

## 🤖 AI Architecture
The backend does not just stream text; it enforces strict JSON schemas for the AI. 
In the `planController.ts`, the Gemini model is prompted with a precise schema definition. The output is parsed and directly saved to MongoDB as structured data, which the frontend then dynamically renders as an interactive workout dashboard.
