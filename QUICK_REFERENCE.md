# 🚀 Quick Reference Card

## Start Services

### Windows:
```bash
start-with-chatbot.bat
```

### Mac/Linux:
```bash
./start-with-chatbot.sh
```

### Manual:
```bash
# Terminal 1
npm run dev

# Terminal 2
cd chatbot && python main.py
```

## URLs

| Service | URL |
|---------|-----|
| Next.js | http://localhost:3000 |
| Chatbot API | http://localhost:8000 |
| API Docs | http://localhost:8000/docs |
| Health Check | http://localhost:8000/health |

## Required .env Files

### `chatbot/.env`
```env
GOOGLE_APPLICATION_CREDENTIALS=./your-key.json
GOOGLE_CLOUD_PROJECT=your-project-id
GOOGLE_CLOUD_LOCATION=us-central1
NEXT_API_BASE_URL=http://localhost:3000
CHATBOT_PORT=8000
```

### `.env.local` (root)
```env
CHATBOT_API_URL=http://localhost:8000
```

## Test Commands

```bash
cd chatbot

# Test Vertex AI connection
python test_vertexai.py

# Test Next.js APIs
python test_apis.py

# Test agent (interactive)
python langchain_agent.py
```

## Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| "Project not found" | Check `GOOGLE_CLOUD_PROJECT` in .env |
| "Permission denied" | Service account needs "Vertex AI User" role |
| "API not enabled" | Run `gcloud services enable aiplatform.googleapis.com` |
| Chatbot not responding | Check Python server is running on :8000 |
| CORS errors | Update allowed origins in `chatbot/main.py` |

## GCP Quick Setup

```bash
# 1. Enable API
gcloud services enable aiplatform.googleapis.com

# 2. Create service account
gcloud iam service-accounts create culfest-chatbot-sa \
  --display-name="Culfest Chatbot"

# 3. Grant role
gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
  --member="serviceAccount:culfest-chatbot-sa@YOUR_PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/aiplatform.user"

# 4. Create key
gcloud iam service-accounts keys create chatbot/key.json \
  --iam-account=culfest-chatbot-sa@YOUR_PROJECT_ID.iam.gserviceaccount.com
```

## Available Tools

1. get_all_events
2. get_event_details
3. get_events_by_category  
4. get_categories
5. add_email_newsletter
6. send_otp
7. check_connection

## Example Queries

- "What events are available?"
- "Show me dance events"
- "Tell me about Battle of Bands"
- "Add email: user@example.com"
- "What categories exist?"

## API Endpoints Created

```
GET  /api/events/getAll
GET  /api/events/getById?id=EVENT_ID
GET  /api/events/getByCategory?category=CATEGORY
GET  /api/events/getCategories
POST /api/addEmail
POST /api/sendOtp
GET  /api/check
POST /api/chatbot/chat
```

## Dependencies

### Python:
```bash
pip install fastapi uvicorn langchain langchain-google-vertexai \
  python-dotenv pydantic requests httpx google-cloud-aiplatform
```

### Node.js:
Already installed in package.json

## File Structure
```
culfest2025/
├── chatbot/
│   ├── main.py              # FastAPI server
│   ├── langchain_agent.py   # AI agent
│   ├── api_client.py        # API calls
│   └── .env                 # Config
├── pages/api/
│   ├── events/              # Event APIs
│   └── chatbot/chat.ts      # Proxy
├── components/
│   └── ChatBot.tsx          # UI
└── .env.local               # Next config
```

## Help & Docs

- Full Setup: `CHATBOT_SETUP.md`
- GCP Setup: `chatbot/VERTEX_AI_SETUP.md`
- Backend: `chatbot/README.md`
- Summary: `chatbot/IMPLEMENTATION_SUMMARY.md`
 
