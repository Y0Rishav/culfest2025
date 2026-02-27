# Culfest 2025 Chatbot

AI-powered chatbot using Python, LangChain, Google Vertex AI, and FastAPI to help users find information about Culfest events.

## Features

- **Google Vertex AI Integration**: Uses Gemini Pro model via Vertex AI
- **LangChain Agents**: Custom tools for event information, email subscription, OTP verification
- **Comprehensive API Coverage**: Tools for all available Culfest APIs
- **Real-time Chat**: Interactive chatbot interface
- **Multi-functional**: Event browsing, newsletter signup, connection checks

## Setup Instructions

### 1. Set Up Google Cloud Project

1. Create a Google Cloud Project at https://console.cloud.google.com/
2. Enable Vertex AI API:
   ```bash
   gcloud services enable aiplatform.googleapis.com
   ```
3. Create a service account and download the JSON key:
   - Go to IAM & Admin > Service Accounts
   - Create a new service account with "Vertex AI User" role
   - Create and download a JSON key file

### 2. Install Python Dependencies

```bash
cd chatbot
pip install -r requirements.txt
```

### 3. Configure Environment Variables

Create a `.env` file in the `chatbot` directory:

```bash
cp .env.example .env
```

Edit `.env` and configure your Google Cloud settings:

```env
GOOGLE_APPLICATION_CREDENTIALS=path/to/your/service-account-key.json
GOOGLE_CLOUD_PROJECT=your-gcp-project-id
GOOGLE_CLOUD_LOCATION=us-central1
NEXT_API_BASE_URL=http://localhost:3000
CHATBOT_PORT=8000
```

### 4. Authenticate with Google Cloud (Alternative Method)

If you prefer using application default credentials:

```bash
gcloud auth application-default login
```

### 5. Start the Chatbot Server

```bash
# From the chatbot directory
python main.py
```

Or using uvicorn:

```bash
uvicorn main:app --reload --port 8000
```

### 6. Update Next.js Environment

Add to your `.env.local` in the root directory:

```env
CHATBOT_API_URL=http://localhost:8000
```

### 7. Add ChatBot Component to Your App

Edit `pages/_app.tsx` to include the ChatBot component (already done):

```tsx
import ChatBot from "@/components/ChatBot";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
      <ChatBot />
    </SessionProvider>
  );
}
```

## Available API Endpoints & Tools

### Event Management Tools

1. **get_all_events** - List all events at Culfest
2. **get_event_details** - Get detailed info about a specific event
3. **get_events_by_category** - Filter events by category
4. **get_categories** - List all available categories

### User Interaction Tools

5. **add_email_newsletter** - Add email to newsletter/mailing list
6. **send_otp** - Send OTP for email verification
7. **check_connection** - Check API health status

### API Endpoints (Backend)

- `GET /api/events/getAll` - Get all events
- `GET /api/events/getById?id={eventId}` - Get event by ID
- `GET /api/events/getByCategory?category={category}` - Get events by category
- `GET /api/events/getCategories` - Get all categories
- `POST /api/addEmail` - Add email to newsletter
- `POST /api/sendOtp` - Send OTP
- `GET /api/check` - Health check

### Chatbot API (Python FastAPI)

- `POST /chat` - Send message to chatbot
  ```json
  {
    "message": "Show me dance events",
    "conversation_id": "optional-id"
  }
  ```

## Example Queries

- "What events are available?"
- "Show me all dance events"
- "Tell me about Battle of Bands"
- "What categories do you have?"
- "Give me details about move mayhem"
- "Add my email to the newsletter: user@example.com"
- "Send OTP to my email"

## Architecture

```
Frontend (Next.js)
    ↓
Next.js API Route (/api/chatbot/chat)
    ↓
Python FastAPI Server (Port 8000)
    ↓
LangChain Agent with Vertex AI (Gemini Pro)
    ↓
Custom Tools → Culfest Event APIs (Next.js)
```

## Troubleshooting

### Vertex AI Authentication Errors
- Ensure `GOOGLE_APPLICATION_CREDENTIALS` points to valid service account key
- Check that Vertex AI API is enabled in your GCP project
- Verify service account has "Vertex AI User" role

### Chatbot service unavailable
- Make sure Python server is running on port 8000
- Check that `CHATBOT_API_URL` is correctly set in `.env.local`

### CORS errors
- FastAPI is configured to allow localhost:3000 and localhost:3001
- Update `main.py` if your frontend runs on a different port

## Development

Test the chatbot directly:

```bash
cd chatbot
python langchain_agent.py
```

This will run test queries and show the agent's responses.

## Why Vertex AI?

- **Enterprise-grade**: Better scalability and reliability
- **Cost-effective**: Competitive pricing for production workloads
- **Gemini Pro**: Advanced language understanding
- **Google Cloud Integration**: Seamless integration with other GCP services
- **No API key rotation**: Uses service account authentication
 
