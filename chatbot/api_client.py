import requests
from typing import Optional, List, Dict, Any
import os
from dotenv import load_dotenv

load_dotenv()

class CulfestAPIClient:
    """Client to interact with all Culfest APIs"""
    
    def __init__(self, base_url: str = None):
        self.base_url = base_url or os.getenv("NEXT_API_BASE_URL", "http://localhost:3000")
    
    # ==================== EVENT APIs ====================
    
    def get_all_events(self) -> Dict[str, Any]:
        """Get all events"""
        try:
            response = requests.get(f"{self.base_url}/api/events/getAll")
            response.raise_for_status()
            return response.json()
        except Exception as e:
            return {"error": str(e), "success": False}
    
    def get_event_by_id(self, event_id: str) -> Dict[str, Any]:
        """Get a specific event by ID"""
        try:
            response = requests.get(
                f"{self.base_url}/api/events/getById",
                params={"id": event_id}
            )
            response.raise_for_status()
            return response.json()
        except Exception as e:
            return {"error": str(e), "success": False}
    
    def get_events_by_category(self, category: str) -> Dict[str, Any]:
        """Get events filtered by category"""
        try:
            response = requests.get(
                f"{self.base_url}/api/events/getByCategory",
                params={"category": category}
            )
            response.raise_for_status()
            return response.json()
        except Exception as e:
            return {"error": str(e), "success": False}
    
    def get_categories(self) -> Dict[str, Any]:
        """Get all available event categories"""
        try:
            response = requests.get(f"{self.base_url}/api/events/getCategories")
            response.raise_for_status()
            return response.json()
        except Exception as e:
            return {"error": str(e), "success": False}
    
    # ==================== USER APIs ====================
    
    def register_event(self, event: str, session: Dict, user_emails: List[str] = None, team_name: str = None) -> Dict[str, Any]:
        """Register a user for an event (requires authentication)"""
        try:
            response = requests.post(
                f"{self.base_url}/api/registerEvent",
                json={
                    "event": event,
                    "session": {"data": session},
                    "userEmails": user_emails or [],
                    "teamName": team_name
                }
            )
            print(f"Registering for event: {event} with session: {session.get('user', {}).get('email', 'unknown')}")
            data = response.json()
            print(f"Register event response ({response.status_code}): {data}")
            return data
        except Exception as e:
            return {"error": str(e), "success": False}
    
    def get_registered_events(self, user: Dict) -> Dict[str, Any]:
        """Get list of events a user is registered for"""
        try:
            print(f"Fetching registered events for user: {user.get('email', 'unknown')}")
            response = requests.post(
                f"{self.base_url}/api/registeredEvents",
                json={"user": user}
            )
            response.raise_for_status()
            print(f"Received registered events response: {response.json()}")
            return response.json()
        except Exception as e:
            return {"error": str(e), "success": False}
    
    def authenticate_user(self, session: Dict) -> Dict[str, Any]:
        """Authenticate user and get user details"""
        try:
            print(f"Authenticating user with session: {session.get('user', {}).get('email', 'unknown')}")
            response = requests.post(
                f"{self.base_url}/api/authenticate",
                json={"session": session}
            )
            response.raise_for_status()
            return response.json()
        except Exception as e:
            return {"error": str(e), "success": False}
    
    # ==================== PAYMENT APIs ====================
    
    def create_payment_order(self, session: Dict) -> Dict[str, Any]:
        """Create a payment order"""
        try:
            response = requests.post(
                f"{self.base_url}/api/order",
                json={"session": session}
            )
            response.raise_for_status()
            return response.json()
        except Exception as e:
            return {"error": str(e), "success": False}
    
    def verify_payment(self, session: Dict) -> Dict[str, Any]:
        """Verify payment status for the logged-in user. Requires session with session.data.user.id"""
        try:
            response = requests.post(
                f"{self.base_url}/api/verifyPaymentStatus",
                json={"session": {"data": session}}
            )
            print(f"Verifying payment for user: {session.get('user', {}).get('email', 'unknown')}")
            response.raise_for_status()
            return response.json()
        except Exception as e:
            return {"error": str(e), "status": 500}
    
    # ==================== EMAIL/OTP APIs ====================
    
    def send_otp(self, email: str) -> Dict[str, Any]:
        """Send OTP to email or phone. Returns {status, message}."""
        try:
            response = requests.post(
                f"{self.base_url}/api/sendOtp",
                json={"email": email}
            )
            return response.json()  # {status: 201/400/409/500, message: '...'}
        except Exception as e:
            return {"error": str(e), "status": 500}
    
    def verify_otp(self, email: str, otp: str) -> Dict[str, Any]:
        """Verify OTP. Returns {status: 201=success, 202=failed, ...}."""
        try:
            response = requests.post(
                f"{self.base_url}/api/verifyOtp",
                json={"email": email, "otp": otp}
            )
            return response.json()  # {status: 201/202/400/409/500, message: '...'}
        except Exception as e:
            return {"error": str(e), "status": 500}
    
    def update_password(self, email: str, password: str) -> Dict[str, Any]:
        """Update user password. Returns {status, message}."""
        try:
            response = requests.post(
                f"{self.base_url}/api/updatePassword",
                json={"email": email, "password": password}
            )
            return response.json()  # {status: 201/400/409/500, message: '...'}
        except Exception as e:
            return {"error": str(e), "status": 500}
    
    def add_email(self, email: str, passkey: str = "culfest2025") -> Dict[str, Any]:
        """Add email to mailing list. Requires email and passkey."""
        try:
            response = requests.post(
                f"{self.base_url}/api/addEmail",
                json={"email": email, "passkey": passkey}
            )
            return {"status": response.status_code, **response.json()}
        except Exception as e:
            return {"error": str(e), "status": 500}
    
    def send_contact_message(self, name: str, email: str, message: str) -> Dict[str, Any]:
        """Send a contact us message. Returns {status, message}."""
        try:
            response = requests.post(
                f"{self.base_url}/api/send",
                json={"name": name, "email": email, "message": message}
            )
            return response.json()  # {status: 201/400/500, message: '...'}
        except Exception as e:
            return {"error": str(e), "status": 500}

    # ==================== UTILITY APIs ====================
    
    def check_connection(self) -> Dict[str, Any]:
        """Check API connection by hitting the events endpoint (always available)"""
        try:
            response = requests.get(f"{self.base_url}/api/events/getCategories")
            response.raise_for_status()
            data = response.json()
            if data.get("success"):
                return {"success": True, "message": "API is healthy"}
            return {"success": False, "error": "Unexpected response"}
        except Exception as e:
            return {"error": str(e), "success": False}
