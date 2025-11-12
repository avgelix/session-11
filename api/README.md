# API Documentation

## Gemini AI Integration

This directory contains Vercel serverless functions for the "Where to Move" game.

### `/api/gemini.js`

**Purpose:** Securely proxy requests to Google Gemini AI to generate city recommendations.

**Method:** POST

**Request Body:**
```json
{
  "answers": [
    {
      "questionId": 1,
      "category": "Climate & Environment",
      "question": "Imagine waking up to snow...",
      "answer": "Excited (embrace cold/snow)"
    },
    // ... more answers
  ]
}
```

**Response (Success):**
```json
{
  "city": "Denver",
  "country": "United States",
  "explanation": "Denver offers a perfect blend of urban amenities and outdoor adventures with snowy winters you'll love. The city's vibrant tech scene and moderate cost of living align well with your preferences."
}
```

**Response (Error):**
```json
{
  "error": "Failed to generate city recommendation. Please try again.",
  "details": "Optional error details in development mode"
}
```

**Status Codes:**
- `200` - Success
- `400` - Invalid request body
- `405` - Method not allowed (use POST)
- `500` - Server error (API key missing or Gemini API failure)

### Environment Variables

Required environment variables (set in Vercel dashboard or `.env.local`):

- `GEMINI_API_KEY` - Google Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

### Local Testing

1. Install Vercel CLI globally:
   ```bash
   npm install -g vercel
   ```

2. Create `.env.local` file:
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   ```

3. Run development server with Vercel functions:
   ```bash
   vercel dev
   ```

4. Test the API endpoint:
   ```bash
   curl -X POST http://localhost:3000/api/gemini \
     -H "Content-Type: application/json" \
     -d '{
       "answers": [
         {
           "questionId": 1,
           "category": "Test",
           "question": "Test question",
           "answer": "Test answer"
         }
       ]
     }'
   ```

### Security Notes

- The API key is NEVER exposed to the client
- All AI requests are proxied through this serverless function
- Rate limiting is handled by Google's free tier (1500 requests/day)
- Input validation prevents malformed requests

### Error Handling

The function includes comprehensive error handling:
- Missing API key → 500 error
- Invalid request body → 400 error
- Gemini API failures → 500 error with retry option
- JSON parsing errors → 500 error with fallback message
