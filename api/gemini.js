/**
 * Vercel Serverless Function: Gemini API Proxy
 * 
 * This function keeps the GEMINI_API_KEY secure by handling AI requests server-side.
 * It accepts user answers, builds a prompt, and returns a city recommendation.
 */

import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    // Validate API key exists
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error('GEMINI_API_KEY is not configured');
      return res.status(500).json({ 
        error: 'API configuration error. Please contact support.' 
      });
    }

    // Validate request body
    const { answers } = req.body;
    if (!answers || !Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({ 
        error: 'Invalid request. Please provide an array of answers.' 
      });
    }

    // Initialize Gemini AI
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Build the prompt from user answers
    const prompt = buildPrompt(answers);

    // Generate AI response
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse the JSON response from Gemini
    const cityMatch = parseGeminiResponse(text);

    // Return the city match
    return res.status(200).json(cityMatch);

  } catch (error) {
    console.error('Gemini API Error:', error);
    
    // Return user-friendly error message
    const isDevelopment = process.env.NODE_ENV === 'development';
    return res.status(500).json({ 
      error: 'Failed to generate city recommendation. Please try again.',
      details: isDevelopment ? error.message : undefined
    });
  }
}

/**
 * Build a structured prompt for Gemini based on user answers
 */
function buildPrompt(answers) {
  // Group answers by category for better context
  const answersByCategory = {};
  answers.forEach(answer => {
    if (!answersByCategory[answer.category]) {
      answersByCategory[answer.category] = [];
    }
    answersByCategory[answer.category].push({
      question: answer.question,
      answer: answer.answer
    });
  });

  // Build structured prompt
  let prompt = `You are a relocation expert helping someone find their perfect city to live in. Based on their preferences below, recommend ONE specific city and country that best matches their lifestyle.

USER PREFERENCES:
`;

  // Add each category with its answers
  Object.keys(answersByCategory).forEach(category => {
    prompt += `\n${category}:\n`;
    answersByCategory[category].forEach(item => {
      prompt += `  - ${item.question}\n    Answer: ${item.answer}\n`;
    });
  });

  prompt += `
INSTRUCTIONS:
1. Analyze all preferences holistically
2. Recommend ONE specific city and country
3. Provide a personalized explanation (2-3 sentences) of why this city matches their preferences
4. Consider climate, lifestyle, culture, cost of living, and all other factors they mentioned
5. Be specific and practical in your recommendation

Respond ONLY with valid JSON in this exact format:
{
  "city": "City Name",
  "country": "Country Name",
  "explanation": "Your personalized 2-3 sentence explanation here"
}`;

  return prompt;
}

/**
 * Parse Gemini's response and extract JSON
 */
function parseGeminiResponse(text) {
  try {
    // Gemini sometimes wraps JSON in markdown code blocks
    let jsonText = text.trim();
    
    // Remove markdown code blocks if present
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    } else if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/```\n?/g, '');
    }
    
    // Parse JSON
    const parsed = JSON.parse(jsonText);
    
    // Validate required fields
    if (!parsed.city || !parsed.country || !parsed.explanation) {
      throw new Error('Missing required fields in response');
    }
    
    return {
      city: parsed.city,
      country: parsed.country,
      explanation: parsed.explanation
    };
    
  } catch (parseError) {
    console.error('Failed to parse Gemini response:', text, parseError);
    throw new Error('Invalid AI response format');
  }
}
