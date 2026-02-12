"""
Test script to verify Vertex AI connection and configuration.
Run this before starting the chatbot to ensure everything is set up correctly.
"""

import os
import sys
from dotenv import load_dotenv

print("="*60)
print("Vertex AI Connection Test")
print("="*60)

# Load environment variables
load_dotenv()

# Check required environment variables
required_vars = [
    "GOOGLE_CLOUD_PROJECT",
    "GOOGLE_CLOUD_LOCATION",
]

print("\n1. Checking environment variables...")
missing_vars = []
for var in required_vars:
    value = os.getenv(var)
    if value:
        print(f"   ✓ {var}: {value}")
    else:
        print(f"   ✗ {var}: NOT SET")
        missing_vars.append(var)

# Check credentials
credentials_path = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")
if credentials_path:
    if os.path.exists(credentials_path):
        print(f"   ✓ GOOGLE_APPLICATION_CREDENTIALS: {credentials_path}")
    else:
        print(f"   ✗ GOOGLE_APPLICATION_CREDENTIALS: File not found at {credentials_path}")
        missing_vars.append("GOOGLE_APPLICATION_CREDENTIALS")
else:
    print("   ⚠ GOOGLE_APPLICATION_CREDENTIALS: Not set (will try application default credentials)")

if missing_vars:
    print(f"\n❌ Missing required configuration: {', '.join(missing_vars)}")
    print("\nPlease configure your .env file properly.")
    print("See VERTEX_AI_SETUP.md for detailed instructions.")
    sys.exit(1)

print("\n2. Testing Vertex AI connection...")
try:
    from langchain_google_vertexai import ChatVertexAI
    
    llm = ChatVertexAI(
        model_name="gemini-2.5-flash",
        project=os.getenv("GOOGLE_CLOUD_PROJECT"),
        location=os.getenv("GOOGLE_CLOUD_LOCATION", "us-central1"),
        max_output_tokens=100,
    )
    
    print("   ✓ Vertex AI client initialized")
    
    # Test a simple query
    print("\n3. Testing query to Gemini Pro...")
    response = llm.invoke("Say 'Hello from Culfest!' in one sentence.")
    print(f"   ✓ Response received: {response.content}")
    
    print("\n" + "="*60)
    print("✅ ALL TESTS PASSED!")
    print("="*60)
    print("\nYour Vertex AI setup is working correctly!")
    print("You can now start the chatbot with: python main.py")
    
except ImportError as e:
    print(f"   ✗ Import error: {e}")
    print("\n❌ Missing dependencies!")
    print("Run: pip install -r requirements.txt")
    sys.exit(1)
    
except Exception as e:
    print(f"   ✗ Error: {e}")
    print("\n❌ CONNECTION FAILED!")
    print("\nPossible issues:")
    print("1. Vertex AI API not enabled in your GCP project")
    print("2. Service account doesn't have 'Vertex AI User' role")
    print("3. Billing not enabled on your GCP project")
    print("4. Invalid project ID or location")
    print("\nSee VERTEX_AI_SETUP.md for troubleshooting steps.")
    sys.exit(1)
