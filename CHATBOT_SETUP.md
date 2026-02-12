# Culfest 2025 Chatbot - Quick Start Guide

## 🚀 Quick Start

### Step 1: Set Up Google Cloud Vertex AI (Required)

**Follow the detailed setup guide**: [chatbot/VERTEX_AI_SETUP.md](chatbot/VERTEX_AI_SETUP.md)

Quick summary:
1. Create a Google Cloud Project
2. Enable Vertex AI API
3. Create a service account with "Vertex AI User" role
4. Download the service account JSON key

### Step 2: Set Up Python Chatbot

1. **Navigate to chatbot directory:**
```bash
cd chatbot
```

2. **Install dependencies:**
```bash
pip install -r requirements.txt
```

3. **Create environment file:**
```bash
# Create .env file
copy .env.example .env   # Windows
cp .env.example .env     # Mac/Linux
```

4. **Configure `.env` with your Google Cloud settings:**
```env
GOOGLE_APPLICATION_CREDENTIALS=./your-service-account-key.json
GOOGLE_CLOUD_PROJECT=your-gcp-project-id
GOOGLE_CLOUD_LOCATION=us-central1
NEXT_API_BASE_URL=http://localhost:3000
CHATBOT_PORT=8000
```

5. **Test Vertex AI connection:**
```bash
python langchain_agent.py
```

6. **Start the chatbot server:**
```bash
python main.py
```

The chatbot will run on http://localhost:8000

### Step 3: Start Next.js Application
```bash
# From root directory
npm run dev
```
Your Next.js app will run on http://localhost:3000

### Step 4: Configure Next.js Environment

Add to `.env.local` in the root directory:
```env
CHATBOT_API_URL=http://localhost:8000
```

### Step 5: Test the Chatbot

1. Open http://localhost:3000 in your browser
2. You'll see a yellow/orange chat button in the bottom-right corner
3. Click it to open the chatbot
4. Try asking:
   - "What events are available?"
   - "Show me dance events"
   - "Tell me about Battle of Bands"
   - "Add my email to newsletter: user@example.com"

## 📋 API Endpoints & Tools

### Event Management APIs (Next.js)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/events/getAll` | GET | Get all events |
| `/api/events/getById?id={eventId}` | GET | Get specific event |
| `/api/events/getByCategory?category={category}` | GET | Filter events by category |
| `/api/events/getCategories` | GET | Get all categories |

### User Interaction APIs

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/addEmail` | POST | Subscribe to newsletter |
| `/api/sendOtp` | POST | Send OTP for verification |
| `/api/registeredEvents` | POST | Get user's registered events |
| `/api/check` | GET | API health check |

### Chatbot API (Python FastAPI)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/chat` | POST | Send message to chatbot |
| `/health` | GET | Health check |
| `/docs` | GET | API documentation |

## 🛠️ LangChain Tools Available

The chatbot has access to these tools:

1. **get_all_events** - List all events at Culfest
2. **get_event_details** - Get detailed info about specific event
3. **get_events_by_category** - Filter events by category (Dance, Music, etc.)
4. **get_categories** - List all available categories
5. **add_email_newsletter** - Subscribe email to newsletter
6. **send_otp** - Send OTP for email verification
7. **check_connection** - Check API health

## 🧪 Testing the APIs

### Test Event APIs (with Next.js running):
```bash
# Get all events
curl http://localhost:3000/api/events/getAll

# Get events by category
curl http://localhost:3000/api/events/getByCategory?category=Dance

# Get all categories
curl http://localhost:3000/api/events/getCategories

# Get specific event
curl "http://localhost:3000/api/events/getById?id=battle%20of%20bands"

# Add email to newsletter
curl -X POST http://localhost:3000/api/addEmail \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'
```

### Test Chatbot API (with Python server running):
```bash
# Health check
curl http://localhost:8000/health

# Send a chat message
curl -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Show me all dance events"}'
```

## 🛠️ Troubleshooting

### Problem: Vertex AI authentication errors
**Solution:** 
1. Follow [chatbot/VERTEX_AI_SETUP.md](chatbot/VERTEX_AI_SETUP.md)
2. Verify service account has "Vertex AI User" role
3. Check `GOOGLE_APPLICATION_CREDENTIALS` path is correct

### Problem: Chatbot button appears but no response
**Solution:** Make sure the Python chatbot server is running on port 8000

### Problem: "Chatbot service is currently unavailable"
**Solution:** 
1. Check Python server is running: `python chatbot/main.py`
2. Verify `.env.local` has: `CHATBOT_API_URL=http://localhost:8000`

### Problem: "Project not found" or Vertex AI errors
**Solution:** 
1. Enable Vertex AI API: `gcloud services enable aiplatform.googleapis.com`
2. Check billing is enabled on your GCP project
3. Verify project ID in `chatbot/.env`

### Problem: CORS errors
**Solution:** Update allowed origins in `chatbot/main.py`:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "your-domain.com"],
    ...
)
```

## 📁 Project Structure

```
culfest2025/
├── pages/
│   └── api/
│       ├── events/
│       │   ├── getAll.ts          # Get all events
│       │   ├── getById.ts         # Get event by ID
│       │   ├── getByCategory.ts   # Filter by category
│       │   └── getCategories.ts   # Get all categories
│       ├── chatbot/
│       │   └── chat.ts            # Chatbot proxy API
│       ├── addEmail.ts            # Newsletter signup
│       ├── sendOtp.ts             # OTP sending
│       └── registeredEvents.ts    # User's events
├── components/
│   └── ChatBot.tsx                # Chatbot UI component
├── chatbot/                       # Python chatbot backend
│   ├── main.py                    # FastAPI server
│   ├── langchain_agent.py         # LangChain agent with Vertex AI
│   ├── api_client.py              # API client for all endpoints
│   ├── requirements.txt           # Python dependencies
│   ├── .env                       # Environment variables
│   └── VERTEX_AI_SETUP.md        # Vertex AI setup guide
└── utils/
    └── mockdata.tsx               # Event data
```

## 🎯 Features

✅ AI-powered chatbot using Google Vertex AI (Gemini Pro)
✅ LangChain agents with custom tools
✅ Integration with all event APIs
✅ Real-time chat interface
✅ Event filtering by category
✅ Email newsletter subscription
✅ OTP verification support
✅ Responsive design with animations
✅ Suggested questions for easy start

## 🔧 Development

### Run all services with one command:

**Windows:**
```bash
start-with-chatbot.bat
```

**Mac/Linux:**
```bash
chmod +x start-with-chatbot.sh
./start-with-chatbot.sh
```

### Test Python agent directly:
```bash
cd chatbot
python langchain_agent.py
```

### View FastAPI docs:
http://localhost:8000/docs

## 📝 Example Queries

Try these questions with the chatbot:
- "What events are happening at Culfest?"
- "Show me all music events"
- "Tell me about Move Mayhem"
- "What categories are available?"
- "Give me details about the Battle of Bands"
- "Show me informal events"
- "Add my email to the newsletter: test@example.com"
- "Send OTP to verify my email"
- "Is the API working?"

## 💡 Why Vertex AI?

- **Enterprise-grade**: Better scalability and reliability
- **Cost-effective**: Competitive pricing (~$0.00025 per 1K chars input)
- **Gemini Pro**: Advanced AI language understanding
- **No API key rotation**: Uses service account authentication
- **Google Cloud Integration**: Seamless with other GCP services
- **Free credits**: $300 for new accounts
