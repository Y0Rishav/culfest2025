#!/bin/bash

echo "Starting Culfest 2025 with Chatbot..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed"
    exit 1
fi

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "Error: Python is not installed"
    exit 1
fi

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "Stopping services..."
    kill $NEXTJS_PID $CHATBOT_PID 2>/dev/null
    echo "Services stopped."
    exit 0
}

trap cleanup SIGINT SIGTERM

# Start Next.js
echo "Starting Next.js application..."
npm run dev &
NEXTJS_PID=$!

# Wait a moment
sleep 3

# Start Python chatbot
echo "Starting Python Chatbot..."
cd chatbot
python3 main.py &
CHATBOT_PID=$!
cd ..

echo ""
echo "========================================"
echo "Both services are running!"
echo ""
echo "Next.js:  http://localhost:3000"
echo "Chatbot:  http://localhost:8000"
echo "========================================"
echo ""
echo "Press Ctrl+C to stop both services..."

# Wait for both processes
wait $NEXTJS_PID $CHATBOT_PID
