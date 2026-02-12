"""
Test script to verify all API endpoints are accessible.
Run this to ensure your Next.js server is running and APIs are working.
"""

import requests
import os
from dotenv import load_dotenv

load_dotenv()

BASE_URL = os.getenv("NEXT_API_BASE_URL", "http://localhost:3000")

print("="*60)
print("API Endpoints Test")
print("="*60)
print(f"\nBase URL: {BASE_URL}\n")

# Define test cases
tests = [
    {
        "name": "Get All Events",
        "method": "GET",
        "url": f"{BASE_URL}/api/events/getAll",
    },
    {
        "name": "Get All Categories",
        "method": "GET",
        "url": f"{BASE_URL}/api/events/getCategories",
    },
    {
        "name": "Get Events by Category (Dance)",
        "method": "GET",
        "url": f"{BASE_URL}/api/events/getByCategory?category=Dance",
    },
    {
        "name": "Get Event by ID",
        "method": "GET",
        "url": f"{BASE_URL}/api/events/getById?id=battle of bands",
    },
    {
        "name": "API Health Check",
        "method": "GET",
        "url": f"{BASE_URL}/api/check",
    },
]

passed = 0
failed = 0

for test in tests:
    try:
        if test["method"] == "GET":
            response = requests.get(test["url"], timeout=5)
        else:
            response = requests.post(test["url"], json=test.get("data", {}), timeout=5)
        
        if response.status_code in [200, 201]:
            print(f"✓ {test['name']}")
            passed += 1
        else:
            print(f"✗ {test['name']} - Status: {response.status_code}")
            failed += 1
            
    except requests.exceptions.ConnectionError:
        print(f"✗ {test['name']} - Connection refused")
        print(f"  Make sure Next.js is running on {BASE_URL}")
        failed += 1
    except Exception as e:
        print(f"✗ {test['name']} - Error: {str(e)}")
        failed += 1

print("\n" + "="*60)
print(f"Results: {passed} passed, {failed} failed")
print("="*60)

if failed == 0:
    print("\n✅ ALL API TESTS PASSED!")
    print("Your Next.js APIs are working correctly!")
else:
    print(f"\n❌ {failed} TEST(S) FAILED!")
    print(f"\nMake sure your Next.js server is running:")
    print("  npm run dev")
