# Google Cloud Vertex AI Setup Guide

This guide will help you set up Google Cloud Vertex AI for the Culfest chatbot.

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click on "Select a project" at the top
3. Click "New Project"
4. Enter project name: `culfest-chatbot` (or your preferred name)
5. Click "Create"

## Step 2: Enable Billing

1. Go to Billing section
2. Link a billing account (required for Vertex AI)
3. You'll get $300 free credits for new accounts

## Step 3: Enable Vertex AI API

### Option A: Using Console
1. Go to "APIs & Services" > "Library"
2. Search for "Vertex AI API"
3. Click "Enable"

### Option B: Using gcloud CLI
```bash
# Install gcloud CLI if not installed
# https://cloud.google.com/sdk/docs/install

# Login
gcloud auth login

# Set your project
gcloud config set project YOUR_PROJECT_ID

# Enable Vertex AI API
gcloud services enable aiplatform.googleapis.com
```

## Step 4: Create a Service Account

1. Go to "IAM & Admin" > "Service Accounts"
2. Click "Create Service Account"
3. Enter details:
   - Name: `culfest-chatbot-sa`
   - Description: `Service account for Culfest chatbot`
4. Click "Create and Continue"
5. Grant roles:
   - Select "Vertex AI User" role
   - Click "Continue"
6. Click "Done"

## Step 5: Create and Download Service Account Key

1. Click on the service account you just created
2. Go to "Keys" tab
3. Click "Add Key" > "Create new key"
4. Select "JSON" format
5. Click "Create"
6. Save the downloaded JSON file securely (e.g., `culfest-sa-key.json`)

**⚠️ Important**: Keep this file secure and never commit it to git!

## Step 6: Configure Environment Variables

1. Copy the service account key to your chatbot directory:
   ```bash
   # Windows
   copy path\to\downloaded-key.json chatbot\culfest-sa-key.json
   
   # Mac/Linux
   cp path/to/downloaded-key.json chatbot/culfest-sa-key.json
   ```

2. Update `chatbot/.env`:
   ```env
   GOOGLE_APPLICATION_CREDENTIALS=./culfest-sa-key.json
   GOOGLE_CLOUD_PROJECT=your-actual-project-id
   GOOGLE_CLOUD_LOCATION=us-central1
   NEXT_API_BASE_URL=http://localhost:3000
   CHATBOT_PORT=8000
   ```

3. Find your project ID:
   - Go to Google Cloud Console
   - Look at the top navigation bar
   - Your project ID is shown next to the project name

## Step 7: Test Vertex AI Access

Create a test script `chatbot/test_vertexai.py`:

```python
import os
from dotenv import load_dotenv
from langchain_google_vertexai import ChatVertexAI

load_dotenv()

try:
    llm = ChatVertexAI(
        model_name="gemini-2.5-flash",
        project=os.getenv("GOOGLE_CLOUD_PROJECT"),
        location=os.getenv("GOOGLE_CLOUD_LOCATION", "us-central1"),
    )
    
    response = llm.invoke("Hello, how are you?")
    print("✓ Vertex AI connection successful!")
    print(f"Response: {response.content}")
    
except Exception as e:
    print("✗ Vertex AI connection failed!")
    print(f"Error: {e}")
```

Run it:
```bash
cd chatbot
python test_vertexai.py
```

## Alternative: Using Application Default Credentials

If you're developing on your own machine, you can use:

```bash
gcloud auth application-default login
```

Then in `.env`, you can omit `GOOGLE_APPLICATION_CREDENTIALS`:
```env
# GOOGLE_APPLICATION_CREDENTIALS not needed with gcloud auth
GOOGLE_CLOUD_PROJECT=your-project-id
GOOGLE_CLOUD_LOCATION=us-central1
NEXT_API_BASE_URL=http://localhost:3000
CHATBOT_PORT=8000
```

## Pricing Information

**Vertex AI (Gemini Pro) Pricing** (as of 2024):
- Input: ~$0.00025 per 1,000 characters
- Output: ~$0.0005 per 1,000 characters
- Very cost-effective for chatbot use cases

**Free Tier**:
- New Google Cloud users get $300 in credits
- Gemini Pro has generous free quotas

## Regions

Available regions for Vertex AI:
- `us-central1` (Iowa) - Recommended for US
- `us-east4` (Virginia)
- `us-west1` (Oregon)
- `europe-west4` (Netherlands)
- `asia-northeast1` (Tokyo)

Choose the region closest to your users for best latency.

## Security Best Practices

1. **Never commit service account keys** to git
   ```bash
   # Add to .gitignore
   echo "chatbot/*.json" >> .gitignore
   echo "chatbot/.env" >> .gitignore
   ```

2. **Use environment-specific keys**
   - Development: Local service account
   - Production: Use Google Cloud's workload identity

3. **Limit service account permissions**
   - Only grant "Vertex AI User" role
   - Don't use owner/editor roles

4. **Rotate keys regularly**
   - Create new keys every 90 days
   - Delete old keys

## Troubleshooting

### Error: "Project not found"
- Verify project ID is correct in `.env`
- Check billing is enabled

### Error: "Permission denied"
- Ensure service account has "Vertex AI User" role
- Re-download service account key

### Error: "API not enabled"
- Run: `gcloud services enable aiplatform.googleapis.com`

### Error: "Quota exceeded"
- Check quotas in GCP Console
- Request quota increase if needed

## Next Steps

After setup:
1. Test the chatbot: `python chatbot/langchain_agent.py`
2. Start the FastAPI server: `python chatbot/main.py`
3. Access docs: http://localhost:8000/docs
 
