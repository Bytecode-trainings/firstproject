# Bytecode AI LMS — Autonomous AI-Powered Learning Management Platform

Enterprise-grade AI SaaS Learning Management System built with a **Vercel Multi-Service Architecture** (`client` Vite SPA + `server` Express API).

![Bytecode AI LMS](https://img.shields.io/badge/Platform-Bytecode%20AI%20LMS-6366f1)
![Architecture](https://img.shields.io/badge/Architecture-Vercel%20Services%20(Client%20+%20Server)-06b6d4)
![AI Models](https://img.shields.io/badge/Models-GPT--4o%20%7C%20Claude%203.5%20%7C%20Gemini%201.5-10b981)

## 🌟 Foundational AI Pillars

1. **Prompt Engineering Studio & Test Bench**:
   - Multi-model evaluation playground (GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro, Llama 3 70B).
   - Dynamic system steering, temperature controls, few-shot prompting, and automated token/latency diagnostic benchmarks.
2. **RAG Knowledge Engines (Retrieval-Augmented Generation)**:
   - Multi-document vector indexing with 1536-dim embeddings.
   - Grounded syllabus semantic search, cosine similarity ranking, and zero-hallucination source citation synthesis.
3. **Autonomous AI Tutor & Recommendation Agents**:
   - 24/7 self-directed interactive tutor chatbot equipped with Chain-of-Thought reasoning.
   - Adaptive curriculum path recommendations based on individual student mastery and performance gaps.
4. **Interview Preparation & Career Acceleration Engine**:
   - Real-time ATS resume keyword analyzer with percentage match scoring.
   - Interactive technical mock interview simulator with automated answer grading rubrics.

## 🏗️ Multi-Service Architecture

```
├── vercel.json           # Vercel Services Routing (rewrites /(.*) to client, /api/(.*) to server)
├── package.json          # Root orchestration scripts
├── client/               # Service: "client" (Vite + React SPA)
│   ├── src/
│   │   ├── App.jsx       # Interactive AI Engines, RAG Visualizer, Tutor Chatbot & Curriculum
│   │   └── index.css     # Dark-mode glassmorphic AI design system
│   ├── vite.config.js    # Local development proxy (/api -> localhost:5000)
│   └── package.json
└── server/               # Service: "server" (Express & Node.js API)
    ├── controllers/      # RAG courses, leads, and authentication
    ├── models/           # MongoDB schemas with resilient in-memory fallback
    ├── routes/           # /api/auth, /api/courses, /api/leads, /api/health
    └── server.js         # Express server with default export for Vercel
```

## 🚀 Deployment to Vercel

The repository is configured for automatic multi-service deployment:
- Push commits to `main` branch on GitHub: [Bytecode-trainings/firstproject](https://github.com/Bytecode-trainings/firstproject).
- Vercel automatically builds both services independently and routes all traffic seamlessly under your unified domain.

---
© 2026 Bytecode AI. All rights reserved.
