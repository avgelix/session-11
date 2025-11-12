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
- **Phase 1:** City/Country matching (main game) - ✅ **COMPLETED**
- **Phase 2:** Neighborhood selection (unlocked after accepting city match) - 🔜 Coming Soon
- **Feedback Loop:** Refusal allows users to explain why and replay

---

## 🚀 Development Setup

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Google Gemini API key (get one at [Google AI Studio](https://makersuite.google.com/app/apikey))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/avgelix/session-11.git
   cd session-11
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   Then edit `.env.local` and add your Gemini API key:
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   ```

### Running Locally

#### Development Mode (Frontend Only)
```bash
npm run dev
```
This starts the Vite dev server at http://localhost:5173

**Note:** The AI integration won't work in this mode. Use Vercel Dev (below) to test the full application.

#### Development with API (Recommended)
```bash
# Install Vercel CLI globally (one-time setup)
npm install -g vercel

# Run development server with serverless functions
vercel dev
```
This starts both the frontend and API at http://localhost:3000

### Testing the AI Integration

1. **Start Vercel dev server:**
   ```bash
   vercel dev
   ```

2. **Test with the provided script:**
   ```bash
   ./test-api.sh
   ```

3. **Or test manually:**
   - Open http://localhost:3000 in your browser
   - Answer all 20 questions
   - Wait for AI recommendation on the results page

### Build for Production
```bash
npm run build
```

### Lint Code
```bash
npm run lint
```

### Preview Production Build
```bash
npm run preview
```

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel --prod
   ```

4. **Set Environment Variables**
   - Go to your project in the Vercel dashboard
   - Navigate to Settings → Environment Variables
   - Add `GEMINI_API_KEY` with your API key
   - Redeploy for changes to take effect

### Automatic Deployments
- Connect your GitHub repository to Vercel
- Every push to `main` branch will automatically deploy
- Pull requests get preview deployments

---

## 📁 Project Structure

```
session-11/
├── api/
│   ├── gemini.js           # Vercel serverless function for AI
│   └── README.md           # API documentation
├── src/
│   ├── components/
│   │   ├── QuestionCard.jsx     # Question display component
│   │   └── ResultsPage.jsx      # AI results display
│   ├── App.jsx             # Main app with game flow
│   ├── main.jsx            # React entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
├── questions.js            # 20 game questions
├── vercel.json            # Vercel configuration
├── .env.local.example     # Environment variable template
├── test-api.sh            # API test script
└── package.json           # Dependencies and scripts
```

---

## 🧪 Testing

### Manual Testing Checklist
- [ ] All 20 questions display correctly
- [ ] Progress indicator updates
- [ ] Answers are captured properly
- [ ] Results page shows loading state
- [ ] AI generates city recommendation
- [ ] Explanation makes sense
- [ ] Accept button shows placeholder message
- [ ] Refuse button restarts the game
- [ ] Error handling works (test with invalid API key)

### API Testing
See `api/README.md` for detailed API testing instructions.

---

## 🔒 Security

- API keys are stored in environment variables (never in code)
- Serverless function validates all requests
- No sensitive data exposed to frontend
- Rate limiting handled by Google's free tier (1500 requests/day)

---

## 🤝 Contributing

This is a learning project. Feel free to:
- Report bugs
- Suggest improvements
- Submit pull requests

---

## 📝 License

This project is open source and available for educational purposes.


