# Where to Move Game

## 📖 Project Overview
**What we're building:** A fun, interactive web game that helps you figure out where in the world you should live.

**Why it matters:** Choosing where to move is overwhelming—there are thousands of cities across hundreds of countries. How do you know which place matches your lifestyle? This game makes it simple: just swipe through cards answering questions about your preferences (like work style, food, hobbies, and budget), and we'll match you with a city that fits you best.

**How it works:** Think "Tinder meets Zillow"—swipe through questions, get matched with your ideal city, then dive deeper to find the perfect neighborhood. It's like having a friendly real estate agent guide you through finding your dream location, but way more fun.

---

## 🎯 Core Concept
An interactive website game that helps users choose where to move in the world through personalized questions and matching.

## 📋 Question Categories
The game collects user preferences across multiple dimensions:
- Lifestyle
- Food preferences
- Personal values
- Hobbies
- Family preferences
- Budget for rent
- Industry/Work
- Transportation preferences (e.g., comfort with flying)

## 🎮 User Interaction & Gameplay
### Card-Based Swipe Mechanic (Tinder-style)
- **Binary Questions (Y/N):** Swipe left or right
- **Multiple Choice Questions:** Swipe in 8 directions
  - Left, Right, Up, Down
  - Upper left, Upper right, Bottom left, Bottom right

### Game Flow
1. User answers questions via swipe cards
2. System generates location match with explanation
3. User decision point:
   - **Accept match** → Proceed to neighborhood selection game
   - **Refuse match** → Provide feedback and restart

## 🎨 Design & Aesthetics

### Visual Style
- **Inspiration:** Zillow meets interactive game
- **Primary Color:** Zillow blue (#0074E4)
- **Feel:** Game-ified version of Zillow's app experience
- **Gameplay Vibe:** "Choose your own adventure" style

### Background
- **Dynamic Google Maps display**
  - Shows random city maps
  - Updates to different city with each answered question

### Tone & Voice
- **Narrator Character:** Helpful real estate agent guiding your journey
- **Tone:** Slightly unserious while maintaining agent professionalism
- **Experience:** Playful yet informative, like a friendly agent who doesn't take themselves too seriously

## 🔄 Game Progression
- **Phase 1:** City/Country matching (main game)
- **Phase 2:** Neighborhood selection (unlocked after accepting city match)
- **Feedback Loop:** Refusal allows users to explain why and replay

---

## 🗺️ Google Maps Setup

This project uses Google Maps API to display dynamic city backgrounds that change with each question.

### Getting Your API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Maps JavaScript API**
4. Navigate to Credentials → Create Credentials → API Key
5. **Important:** Restrict your API key to "Maps JavaScript API" only

### Local Development Setup

1. Copy `.env.local` file (already created in the project)
2. Add your API key:
   ```
   VITE_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
   ```
3. Restart your dev server if it's running

### Vercel/Production Setup

Add the environment variable in your Vercel dashboard:
- Variable name: `VITE_GOOGLE_MAPS_API_KEY`
- Value: Your Google Maps API key

### Free Tier Limits

The map loads once per session and updates the center point when questions change. This stays well within Google Maps free tier (28,000 loads/month).

**Note:** If no API key is configured, the app will work fine but won't display the map background.

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Lint code
npm run lint
```

