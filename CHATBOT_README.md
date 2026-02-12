# 🎯 Culfest 2025 - AI Chatbot with Vertex AI

## ✨ What's New (v2.1)

Your Culfest website now includes an **AI-powered chatbot** using:
- 🤖 **Google Vertex AI (Gemini Pro)** - State-of-the-art AI
- 🔗 **LangChain Agents** - Intelligent tool orchestration
- 🛠️ **13 Custom Tools** - Complete API coverage (upgraded from 7)
- 💬 **Beautiful UI** - Floating chat interface
- ⚡ **Streaming Responses** - Real-time token-by-token responses
- 🧠 **Conversation Memory** - Remembers context within conversation
- 🔐 **User Authentication** - Secure access to personal data (NEW)
- 🔒 **Privacy Protection** - Users see only their own data (NEW)

## 🚀 Quick Start (3 Steps)

### 1️⃣ Set Up Google Cloud (One-time)

Follow the detailed guide: **[chatbot/VERTEX_AI_SETUP.md](chatbot/VERTEX_AI_SETUP.md)**

Quick version:
```bash
# Enable Vertex AI API
gcloud services enable aiplatform.googleapis.com

# Create service account with JSON key
# (See VERTEX_AI_SETUP.md for detailed steps)
```

### 2️⃣ Configure Environment

```bash
# Install Python dependencies
cd chatbot
pip install -r requirements.txt

# Create and configure .env
cp .env.example .env
# Edit .env with your GCP credentials
```

Required in `chatbot/.env`:
```env
GOOGLE_APPLICATION_CREDENTIALS=./your-service-account-key.json
GOOGLE_CLOUD_PROJECT=your-gcp-project-id
GOOGLE_CLOUD_LOCATION=us-central1
NEXT_API_BASE_URL=http://localhost:3000
CHATBOT_PORT=8000
```

Add to `.env.local` (root):
```env
CHATBOT_API_URL=http://localhost:8000
```

### 3️⃣ Start Everything

**Option A - Automated (Windows):**
```bash
start-with-chatbot.bat
```

**Option B - Automated (Mac/Linux):**
```bash
chmod +x start-with-chatbot.sh
./start-with-chatbot.sh
```

**Option C - Manual:**
```bash
# Terminal 1: Next.js
npm run dev

# Terminal 2: Chatbot
npm run chatbot
# or: cd chatbot && python main.py
```

### 🧪 Test Your Setup

```bash
# Test Vertex AI connection
npm run test:vertexai

# Test Next.js APIs
npm run test:apis

# Or use the test script (Windows)
test-setup.bat
```

## 💬 Using the Chatbot

1. Open http://localhost:3000
2. **Login to your account** (required for personal features)
3. Look for the **yellow/orange floating button** (bottom-right)
4. Click to open the chat
5. Try these questions:

**Public Queries (No Login Required):**
   - "What events are available?"
   - "Show me all dance events"
   - "Tell me about Battle of Bands"
   - "What categories do you have?"
   - "Add my email to newsletter: user@example.com"

**Authenticated Queries (Login Required):**
   - "What events am I registered for?"
   - "Register me for Battle of Bands"
   - "Show my profile"
   - "What's my payment status?"

### 🆕 New Features (v2.1)

**User Authentication:**
- Chatbot automatically detects if you're logged in
- Access your personal data (registrations, profile)
- Register for events directly through chat
- All data is private and secure

**Streaming Responses:**
- Responses appear in real-time as they're generated
- Watch the blinking cursor as the bot types
- Better UX with perceived faster responses

**Conversation Memory:**
- Bot remembers your conversation context
- Ask follow-up questions without repeating yourself
- Example: "What dance events?" → "Tell me more about the first one"
- Click refresh icon to clear history and start fresh

## 🛠️ Available Tools

The AI chatbot can access these tools:

### Public Tools (No Login Required)

| # | Tool | What It Does |
|---|------|--------------|
| 1 | **get_all_events** | Lists all Culfest events |
| 2 | **get_event_details** | Gets details about a specific event |
| 3 | **get_events_by_category** | Filters events by category (Dance, Music, etc.) |
| 4 | **get_categories** | Lists all available categories |
| 5 | **add_email_newsletter** | Subscribes email to newsletter |
| 6 | **send_otp** | Sends OTP for email verification |
| 7 | **check_connection** | Checks API health status |

### Authenticated Tools (Login Required)

| # | Tool | What It Does |
|---|------|--------------|
| 8 | **register_for_event** | Register user for an event |
| 9 | **get_my_registered_events** | View user's event registrations |
| 10 | **get_my_profile** | View user's profile information |
| 11 | **check_payment_status** | Check payment order status |
| 12 | **verify_otp** | Verify OTP code |
| 13 | **reset_password** | Update user password |

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)** | Quick commands & troubleshooting |
| **[CHATBOT_SETUP.md](CHATBOT_SETUP.md)** | Complete setup guide |
| **[chatbot/AUTHENTICATION_AND_TOOLS.md](chatbot/AUTHENTICATION_AND_TOOLS.md)** | Authentication & tool guide (NEW) |
| **[chatbot/STREAMING_AND_MEMORY.md](chatbot/STREAMING_AND_MEMORY.md)** | Streaming & memory features |
| **[chatbot/VERTEX_AI_SETUP.md](chatbot/VERTEX_AI_SETUP.md)** | Google Cloud configuration |
| **[chatbot/README.md](chatbot/README.md)** | Backend documentation |
| **[chatbot/IMPLEMENTATION_SUMMARY.md](chatbot/IMPLEMENTATION_SUMMARY.md)** | Technical details |

## 🌐 API Endpoints

### New Event APIs

All these APIs are now available:

```bash
# Get all events
GET /api/events/getAll

# Get specific event
GET /api/events/getById?id=battle%20of%20bands

# Filter by category
GET /api/events/getByCategory?category=Dance

# List categories
GET /api/events/getCategories
```

### Chatbot API

```bash
# Send message to chatbot (streaming - default)
POST http://localhost:8000/chat/stream
{
  "message": "What events are available?",
  "conversation_id": "optional",
  "stream": true
}

# Send message (non-streaming fallback)
POST http://localhost:8000/chat
{
  "message": "What events are available?",
  "conversation_id": "optional"
}

# Get conversation history
GET http://localhost:8000/chat/history/{conversation_id}

# Clear conversation history
DELETE http://localhost:8000/chat/history/{conversation_id}

# Health check
GET http://localhost:8000/health

# Interactive API docs
http://localhost:8000/docs
```

## 🏗️ Architecture

```
┌─────────────────┐
│  User Browser   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ ChatBot (React) │  ← Beautiful UI on every page
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Next.js API     │  ← /api/chatbot/chat
│   (Port 3000)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  FastAPI Server │  ← Python Backend
│   (Port 8000)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ LangChain Agent │  ← Decision Making
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Vertex AI      │  ← Gemini Pro Model
│  (Gemini Pro)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Custom Tools   │  ← 7 Tools
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Next.js APIs    │  ← Your APIs
└─────────────────┘
```

## 🎨 Features

✅ **AI-Powered**: Uses Google's latest Gemini Pro model
✅ **Intelligent**: LangChain agents make smart decisions
✅ **Comprehensive**: 13 tools covering all major APIs
✅ **Beautiful UI**: Polished chat interface with animations
✅ **Streaming Responses**: Real-time token-by-token responses
✅ **Conversation Memory**: Remembers context within conversation
✅ **User Authentication**: Secure access to personal data (NEW v2.1)
✅ **Privacy Protected**: Users see only their own data (NEW v2.1)
✅ **Contextual**: Understands follow-up questions
✅ **Secure**: Service account authentication
✅ **Scalable**: Enterprise-grade infrastructure
✅ **Cost-effective**: Lower than OpenAI pricing

## 💰 Pricing

**Vertex AI (Gemini Pro)**:
- Input: ~$0.00025 per 1K characters
- Output: ~$0.0005 per 1K characters
- **Very affordable** for chatbot usage
- New users get **$300 free credits**

Example: 10,000 messages ≈ $5-10 (vs $20-30 with OpenAI)

## 🔧 NPM Scripts

```bash
# Development
npm run dev              # Start Next.js
npm run chatbot          # Start Python chatbot

# Testing
npm run test:vertexai    # Test Vertex AI connection
npm run test:apis        # Test Next.js APIs

# Production
npm run build            # Build Next.js
npm run start            # Start production server
```

## 🐛 Troubleshooting

### Quick Fixes:

| Problem | Solution |
|---------|----------|
| ❌ Chatbot not responding | Check Python server: `npm run chatbot` |
| ❌ "Project not found" | Verify `GOOGLE_CLOUD_PROJECT` in `.env` |
| ❌ "Permission denied" | Service account needs "Vertex AI User" role |
| ❌ "API not enabled" | Run: `gcloud services enable aiplatform.googleapis.com` |
| ❌ CORS errors | Update origins in `chatbot/main.py` |

**Full troubleshooting**: See [CHATBOT_SETUP.md](CHATBOT_SETUP.md)

## 📦 File Structure

```
culfest2025/
│
├── 📄 QUICK_REFERENCE.md           # Quick commands
├── 📄 CHATBOT_SETUP.md             # Setup guide
├── 📄 package.json                 # NPM scripts added
│
├── chatbot/                         # 🐍 Python Backend
│   ├── main.py                     # FastAPI server
│   ├── langchain_agent.py          # AI agent + tools
│   ├── api_client.py               # API client
│   ├── requirements.txt            # Dependencies
│   ├── .env.example                # Config template
│   ├── test_vertexai.py            # Test Vertex AI
│   ├── test_apis.py                # Test APIs
│   ├── README.md                   # Backend docs
│   ├── VERTEX_AI_SETUP.md          # GCP setup
│   └── IMPLEMENTATION_SUMMARY.md   # Technical details
│
├── pages/api/
│   ├── events/                      # 🆕 Event APIs
│   │   ├── getAll.ts
│   │   ├── getById.ts
│   │   ├── getByCategory.ts
│   │   └── getCategories.ts
│   └── chatbot/
│       └── chat.ts                  # 🆕 Chatbot proxy
│
├── components/
│   └── ChatBot.tsx                  # 🆕 Chat UI
│
└── pages/_app.tsx                   # ✏️ Updated (chatbot added)
```

## 🚦 Getting Started Checklist

- [ ] Read [CHATBOT_SETUP.md](CHATBOT_SETUP.md)
- [ ] Follow [chatbot/VERTEX_AI_SETUP.md](chatbot/VERTEX_AI_SETUP.md)
- [ ] Install Python dependencies: `cd chatbot && pip install -r requirements.txt`
- [ ] Configure `chatbot/.env` with GCP credentials
- [ ] Add `CHATBOT_API_URL` to `.env.local`
- [ ] Run tests: `npm run test:vertexai`
- [ ] Start Next.js: `npm run dev`
- [ ] Start chatbot: `npm run chatbot`
- [ ] Open http://localhost:3000 and test chat

## 📖 Learn More

- **LangChain**: https://python.langchain.com/
- **Vertex AI**: https://cloud.google.com/vertex-ai
- **Gemini API**: https://ai.google.dev/
- **FastAPI**: https://fastapi.tiangolo.com/

## 🤝 Support

Having issues?
1. Check [QUICK_REFERENCE.md](QUICK_REFERENCE.md) for common solutions
2. Run test scripts: `npm run test:vertexai`
3. Check Python server logs
4. Verify GCP configuration

## 🎉 You're All Set!

Your chatbot is ready to help users learn about Culfest events! 🚀

**Test it now**: http://localhost:3000

---

Made with ❤️ for Culfest 2025 | Powered by Google Vertex AI
