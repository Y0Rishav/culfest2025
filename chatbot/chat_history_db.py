"""MongoDB chat history storage for Culfest chatbot"""
import os
from datetime import datetime
from typing import Optional, Dict, Any
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure
from dotenv import load_dotenv

load_dotenv()

class ChatHistoryDB:
    def __init__(self):
        self.client = None
        self.db = None
        self.collection = None
        self._connect()
    
    def _connect(self):
        """Connect to MongoDB"""
        try:
            mongo_url = os.getenv("MONGODB_URL")
            if not mongo_url:
                print("Warning: MONGODB_URL not set, chat history will not be saved")
                return
            
            self.client = MongoClient(mongo_url)
            self.db = self.client["culfest2025"]
            self.collection = self.db["chat_history"]
            
            # Test connection
            self.client.admin.command('ping')
            print("✅ Connected to MongoDB for chat history")
        except ConnectionFailure as e:
            print(f"❌ Failed to connect to MongoDB: {e}")
            self.client = None
    
    def save_chat(
        self,
        conversation_id: str,
        user_message: str,
        bot_response: str,
        user_email: Optional[str] = None,
        user_name: Optional[str] = None,
        user_phone: Optional[str] = None,
        user_id: Optional[str] = None,
    ) -> bool:
        """Save a chat exchange to MongoDB"""
        if not self.collection:
            return False
        
        try:
            chat_doc = {
                "conversation_id": conversation_id,
                "timestamp": datetime.utcnow(),
                "user_message": user_message,
                "bot_response": bot_response,
                "user": {
                    "email": user_email,
                    "name": user_name,
                    "phone": user_phone,
                    "id": user_id,
                },
            }
            
            self.collection.insert_one(chat_doc)
            return True
        except Exception as e:
            print(f"Error saving chat history: {e}")
            return False
    
    def get_conversation_history(self, conversation_id: str) -> list:
        """Retrieve all messages from a conversation"""
        if not self.collection:
            return []
        
        try:
            chats = self.collection.find(
                {"conversation_id": conversation_id}
            ).sort("timestamp", 1)
            
            return list(chats)
        except Exception as e:
            print(f"Error retrieving chat history: {e}")
            return []
    
    def get_user_conversations(self, user_email: str) -> list:
        """Get all conversations for a user"""
        if not self.collection:
            return []
        
        try:
            conversations = self.collection.aggregate([
                {"$match": {"user.email": user_email}},
                {"$group": {
                    "_id": "$conversation_id",
                    "last_message": {"$last": "$$ROOT"},
                    "message_count": {"$sum": 1}
                }},
                {"$sort": {"last_message.timestamp": -1}}
            ])
            
            return list(conversations)
        except Exception as e:
            print(f"Error retrieving user conversations: {e}")
            return []

# Singleton instance
_chat_history_db = None

def get_chat_history_db() -> ChatHistoryDB:
    """Get or create chat history DB singleton"""
    global _chat_history_db
    if _chat_history_db is None:
        _chat_history_db = ChatHistoryDB()
    return _chat_history_db
