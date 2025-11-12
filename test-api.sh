#!/bin/bash

# Test script for Gemini API integration
# This script helps verify the API is working correctly

echo "🧪 Testing Gemini API Integration"
echo "================================="
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "❌ Error: .env.local file not found"
    echo "📝 Please create .env.local with your GEMINI_API_KEY"
    echo "   Example: GEMINI_API_KEY=your_api_key_here"
    exit 1
fi

# Check if GEMINI_API_KEY is set in .env.local
if ! grep -q "GEMINI_API_KEY=" .env.local; then
    echo "❌ Error: GEMINI_API_KEY not found in .env.local"
    echo "📝 Please add GEMINI_API_KEY=your_api_key_here to .env.local"
    exit 1
fi

echo "✅ Environment file found"
echo ""

# Sample test data - minimal answer set
TEST_DATA='{
  "answers": [
    {
      "questionId": 1,
      "category": "Climate & Environment",
      "question": "Imagine waking up to snow on a winter morning. Does this excite you or make you want to stay in bed forever?",
      "answer": "Excited (embrace cold/snow)"
    },
    {
      "questionId": 4,
      "category": "Lifestyle & Pace",
      "question": "It'\''s 11 PM on a Tuesday. Where do you want to be?",
      "answer": "Out grabbing late-night food (vibrant nightlife)"
    },
    {
      "questionId": 8,
      "category": "Work & Economy",
      "question": "You just got your paycheck. After rent, you have...",
      "answer": "Less than you'\''d like, but you love where you live"
    }
  ]
}'

echo "📡 Testing API endpoint..."
echo "Sending sample answers to /api/gemini"
echo ""

# Make the API call (requires vercel dev to be running)
RESPONSE=$(curl -s -X POST http://localhost:3000/api/gemini \
  -H "Content-Type: application/json" \
  -d "$TEST_DATA" 2>&1)

EXIT_CODE=$?

if [ $EXIT_CODE -ne 0 ]; then
    echo "❌ Error: Failed to connect to API"
    echo "💡 Make sure 'vercel dev' is running in another terminal"
    echo "   Run: vercel dev"
    exit 1
fi

echo "📨 Response received:"
echo "$RESPONSE" | python3 -m json.tool 2>/dev/null || echo "$RESPONSE"
echo ""

# Check if response contains expected fields
if echo "$RESPONSE" | grep -q '"city"' && echo "$RESPONSE" | grep -q '"country"' && echo "$RESPONSE" | grep -q '"explanation"'; then
    echo "✅ Success! API is working correctly"
    echo "🎉 Your Gemini integration is ready to use!"
else
    echo "⚠️  Warning: Response doesn't contain expected fields"
    echo "💡 Check the error message above for details"
fi
