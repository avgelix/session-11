# Where to Move Game - Detailed Build Plan

## 🎯 Overview
This is your step-by-step roadmap to build the "Where to Move" game. Each phase is designed to be **incremental and testable** - you'll always have a working app as you progress. No overwhelming big-bang builds, just steady progress!

**Total Estimated Time:** 8-10 days (working a few hours per day)

---

## 📋 Phase 0: Project Setup & Foundation
**Time Estimate:** 30-45 minutes  
**Goal:** Get a working React development environment with Tailwind CSS configured

### Step 0.1: Initialize Vite React Project
```bash
# Create React app with Vite template
npm create vite@latest . -- --template react

# Install dependencies
npm install
```

**What this does:**
- Creates a modern React project with Vite (faster than Create React App)
- Sets up hot module replacement (instant preview of changes)
- Creates basic folder structure: `src/`, `public/`, etc.

### Step 0.2: Install and Configure Tailwind CSS
```bash
# Install Tailwind and its dependencies
npm install -D tailwindcss postcss autoprefixer

# Generate Tailwind config files
npx tailwindcss init -p
```

**Configure Tailwind:** Edit `tailwind.config.js`:
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'zillow-blue': '#0074E4',
      },
    },
  },
  plugins: [],
}
```

**Add Tailwind directives:** Edit `src/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Step 0.3: Clean Up Boilerplate
**Files to delete:**
- `src/App.css` (we're using Tailwind)
- `src/assets/react.svg`

**Files to simplify:**
- `src/App.jsx` - Remove all boilerplate, create a simple "Hello World"

### Step 0.4: Start Development Server
```bash
npm run dev
```

### ✅ Success Criteria:
- [ ] Dev server starts at `http://localhost:5173`
- [ ] You see a blank page or "Hello World" text
- [ ] No console errors
- [ ] Tailwind classes work (test with `className="text-blue-500"`)

### 🐛 Common Issues:
- **Port already in use:** Kill the process or use a different port
- **Module not found:** Run `npm install` again
- **Tailwind not working:** Check that `index.css` is imported in `main.jsx`

---

## 📋 Phase 1: Display First Question Card
**Time Estimate:** 2-3 hours  
**Goal:** Create a beautiful card component that displays one question

### Step 1.1: Create Basic Card Component
**Create:** `src/components/QuestionCard.jsx`

```jsx
export default function QuestionCard({ question, questionNumber, totalQuestions }) {
  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-2xl shadow-2xl">
      {/* Progress indicator */}
      <div className="text-center text-gray-500 text-sm mb-4">
        Question {questionNumber} of {totalQuestions}
      </div>
      
      {/* Category badge */}
      <div className="inline-block px-3 py-1 bg-zillow-blue/10 text-zillow-blue rounded-full text-xs font-semibold mb-4">
        {question.category}
      </div>
      
      {/* Question text */}
      <h2 className="text-2xl font-bold text-gray-800 mb-8">
        {question.text}
      </h2>
      
      {/* Options (for reference, not interactive yet) */}
      <div className="space-y-3 text-sm text-gray-600">
        <div>← {question.options.left}</div>
        <div>→ {question.options.right}</div>
      </div>
    </div>
  );
}
```

### Step 1.2: Update App.jsx to Use Card
**Edit:** `src/App.jsx`

```jsx
import { useState } from 'react'
import QuestionCard from './components/QuestionCard'
import { questions } from '../questions'

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  
  const currentQuestion = questions[currentQuestionIndex]
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <QuestionCard 
        question={currentQuestion}
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={questions.length}
      />
    </div>
  )
}

export default App
```

### Step 1.3: Test Responsive Design
- Open browser dev tools (F12)
- Toggle device toolbar (mobile view)
- Verify card looks good on:
  - Mobile (375px width)
  - Tablet (768px width)
  - Desktop (1024px+ width)

### ✅ Success Criteria:
- [ ] A beautiful card appears on screen
- [ ] Shows Question 1 from `questions.js`
- [ ] Category badge displays with Zillow blue
- [ ] Card is centered and responsive
- [ ] Shadow and rounded corners look professional

### 💡 Learning Points:
- **Component props:** How to pass data to components
- **Tailwind utility classes:** Spacing, colors, shadows
- **Responsive design:** Using max-width and padding

---

## 📋 Phase 2: Add Click-Based Navigation
**Time Estimate:** 2-3 hours  
**Goal:** Navigate through all 20 questions using buttons

### Step 2.1: Add State Management for Answers
**Edit:** `src/App.jsx`

```jsx
import { useState } from 'react'
import QuestionCard from './components/QuestionCard'
import { questions } from '../questions'

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState([]) // Store user answers
  
  const currentQuestion = questions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === questions.length - 1
  
  const handleAnswer = (direction) => {
    // Save the answer
    const newAnswer = {
      questionId: currentQuestion.id,
      category: currentQuestion.category,
      direction: direction, // 'left' or 'right'
      selectedOption: currentQuestion.options[direction]
    }
    
    setAnswers([...answers, newAnswer])
    
    // Move to next question or finish
    if (!isLastQuestion) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      console.log('Game complete! Answers:', [...answers, newAnswer])
      // TODO: Navigate to results page
    }
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <QuestionCard 
        question={currentQuestion}
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={questions.length}
        onAnswer={handleAnswer}
      />
    </div>
  )
}

export default App
```

### Step 2.2: Add Interactive Buttons to Card
**Edit:** `src/components/QuestionCard.jsx`

```jsx
export default function QuestionCard({ question, questionNumber, totalQuestions, onAnswer }) {
  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-2xl shadow-2xl">
      {/* Progress indicator */}
      <div className="text-center text-gray-500 text-sm mb-4">
        Question {questionNumber} of {totalQuestions}
      </div>
      
      {/* Progress bar */}
      <div className="w-full h-2 bg-gray-200 rounded-full mb-6">
        <div 
          className="h-2 bg-zillow-blue rounded-full transition-all duration-300"
          style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
        />
      </div>
      
      {/* Category badge */}
      <div className="inline-block px-3 py-1 bg-zillow-blue/10 text-zillow-blue rounded-full text-xs font-semibold mb-4">
        {question.category}
      </div>
      
      {/* Question text */}
      <h2 className="text-2xl font-bold text-gray-800 mb-8">
        {question.text}
      </h2>
      
      {/* Interactive buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => onAnswer('left')}
          className="flex-1 py-4 px-6 bg-gray-100 hover:bg-gray-200 rounded-xl font-semibold text-gray-700 transition-all duration-200 hover:scale-105 active:scale-95"
        >
          ← {question.options.left}
        </button>
        <button
          onClick={() => onAnswer('right')}
          className="flex-1 py-4 px-6 bg-zillow-blue hover:bg-blue-600 rounded-xl font-semibold text-white transition-all duration-200 hover:scale-105 active:scale-95"
        >
          {question.options.right} →
        </button>
      </div>
    </div>
  )
}
```

### Step 2.3: Add Visual Feedback
**Enhancements to add:**
- Button hover states (already included above)
- Active/pressed states (`active:scale-95`)
- Progress bar animation
- Smooth transitions

### Step 2.4: Test the Flow
**Manual testing checklist:**
- [ ] Click through all 20 questions
- [ ] Progress bar fills correctly
- [ ] Categories change appropriately
- [ ] Console logs final answers array
- [ ] No errors in console
- [ ] Buttons feel responsive (hover/click feedback)

### ✅ Success Criteria:
- [ ] Can navigate through all 20 questions by clicking
- [ ] Answers are stored in state
- [ ] Progress bar shows accurate progress
- [ ] Button interactions feel smooth
- [ ] Final answers array logged to console

### 💡 Learning Points:
- **React state management:** Using `useState` for arrays
- **Event handlers:** Passing functions as props
- **Conditional rendering:** Handling last question differently
- **CSS transitions:** Making interactions feel polished

---

## 📋 Phase 3: Implement Swipe Gestures
**Time Estimate:** 4-5 hours  
**Goal:** Replace buttons with smooth swipe interactions using Framer Motion

### Step 3.1: Install Framer Motion
```bash
npm install framer-motion
```

### Step 3.2: Create Swipeable Card Component
**Create:** `src/components/SwipeCard.jsx`

```jsx
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useState } from 'react'

export default function SwipeCard({ question, questionNumber, totalQuestions, onAnswer }) {
  const [exitDirection, setExitDirection] = useState(null)
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-25, 25])
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0])
  
  const handleDragEnd = (event, info) => {
    const swipeThreshold = 100
    
    if (Math.abs(info.offset.x) > swipeThreshold) {
      // Determine direction
      const direction = info.offset.x > 0 ? 'right' : 'left'
      setExitDirection(direction)
      
      // Small delay to show exit animation, then call onAnswer
      setTimeout(() => {
        onAnswer(direction)
        setExitDirection(null) // Reset for next card
      }, 200)
    }
  }
  
  return (
    <motion.div
      className="max-w-md mx-auto mt-20 p-8 bg-white rounded-2xl shadow-2xl cursor-grab active:cursor-grabbing"
      style={{ x, rotate, opacity }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      animate={exitDirection ? {
        x: exitDirection === 'right' ? 1000 : -1000,
        opacity: 0,
        transition: { duration: 0.2 }
      } : {}}
    >
      {/* Progress indicator */}
      <div className="text-center text-gray-500 text-sm mb-4">
        Question {questionNumber} of {totalQuestions}
      </div>
      
      {/* Progress bar */}
      <div className="w-full h-2 bg-gray-200 rounded-full mb-6">
        <div 
          className="h-2 bg-zillow-blue rounded-full transition-all duration-300"
          style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
        />
      </div>
      
      {/* Category badge */}
      <div className="inline-block px-3 py-1 bg-zillow-blue/10 text-zillow-blue rounded-full text-xs font-semibold mb-4">
        {question.category}
      </div>
      
      {/* Question text */}
      <h2 className="text-2xl font-bold text-gray-800 mb-8">
        {question.text}
      </h2>
      
      {/* Swipe hints */}
      <div className="flex justify-between text-sm text-gray-400">
        <div>← Swipe left: {question.options.left}</div>
        <div>Swipe right: {question.options.right} →</div>
      </div>
    </motion.div>
  )
}
```

### Step 3.3: Update App to Use SwipeCard
**Edit:** `src/App.jsx`

```jsx
import { useState } from 'react'
import SwipeCard from './components/SwipeCard' // Changed from QuestionCard
import { questions } from '../questions'

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState([])
  
  const currentQuestion = questions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === questions.length - 1
  
  const handleAnswer = (direction) => {
    const newAnswer = {
      questionId: currentQuestion.id,
      category: currentQuestion.category,
      direction: direction,
      selectedOption: currentQuestion.options[direction]
    }
    
    setAnswers([...answers, newAnswer])
    
    if (!isLastQuestion) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      console.log('Game complete! Answers:', [...answers, newAnswer])
      // TODO: Navigate to results page
    }
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <SwipeCard 
        key={currentQuestionIndex} // Important: force remount on question change
        question={currentQuestion}
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={questions.length}
        onAnswer={handleAnswer}
      />
    </div>
  )
}

export default App
```

### Step 3.4: Add Swipe Direction Indicators
**Enhancement:** Show visual feedback while dragging

**Create:** `src/components/SwipeIndicators.jsx`

```jsx
import { motion, useMotionValue, useTransform } from 'framer-motion'

export default function SwipeIndicators({ x }) {
  const leftOpacity = useTransform(x, [-100, 0], [1, 0])
  const rightOpacity = useTransform(x, [0, 100], [0, 1])
  
  return (
    <>
      {/* Left indicator */}
      <motion.div 
        className="absolute top-8 left-8 text-6xl"
        style={{ opacity: leftOpacity }}
      >
        👎
      </motion.div>
      
      {/* Right indicator */}
      <motion.div 
        className="absolute top-8 right-8 text-6xl"
        style={{ opacity: rightOpacity }}
      >
        👍
      </motion.div>
    </>
  )
}
```

**Update SwipeCard to include indicators:**
```jsx
import SwipeIndicators from './SwipeIndicators'

// Inside SwipeCard component:
<motion.div className="relative max-w-md mx-auto mt-20 p-8 bg-white rounded-2xl shadow-2xl cursor-grab active:cursor-grabbing" ...>
  <SwipeIndicators x={x} />
  {/* rest of card content */}
</motion.div>
```

### Step 3.5: Test Swipe Mechanics
**Testing checklist:**
- [ ] Card drags smoothly left/right
- [ ] Card rotates slightly while dragging
- [ ] Swipe indicators appear (👎/👍)
- [ ] Card exits when swiped far enough
- [ ] New card appears after swipe
- [ ] Works on touch devices (test on phone)
- [ ] Swipe threshold feels natural (100px)

### Step 3.6: Add Fallback Buttons (Accessibility)
For users who prefer clicking or have accessibility needs, add small buttons below the card.

**Add to SwipeCard:**
```jsx
{/* Fallback buttons - below swipe hints */}
<div className="flex gap-2 mt-4">
  <button
    onClick={() => onAnswer('left')}
    className="flex-1 py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700"
  >
    ← No
  </button>
  <button
    onClick={() => onAnswer('right')}
    className="flex-1 py-2 px-4 bg-zillow-blue hover:bg-blue-600 rounded-lg text-sm font-medium text-white"
  >
    Yes →
  </button>
</div>
```

### ✅ Success Criteria:
- [ ] Smooth swipe gestures work perfectly
- [ ] Cards animate off-screen in swipe direction
- [ ] Visual feedback during drag (rotation, indicators)
- [ ] Works on both desktop (mouse) and mobile (touch)
- [ ] Fallback buttons still work
- [ ] No janky animations or bugs

### 💡 Learning Points:
- **Framer Motion basics:** drag, animate, useMotionValue
- **Transform values:** Linking drag position to rotation/opacity
- **Animation timing:** Using setTimeout for sequenced animations
- **Mobile gestures:** Touch events vs mouse events

---

## 📋 Phase 4: Results Page & localStorage
**Time Estimate:** 3-4 hours  
**Goal:** Show results after 20 questions and persist progress

### Step 4.1: Create Results Component
**Create:** `src/components/ResultsPage.jsx`

```jsx
export default function ResultsPage({ answers, onRestart }) {
  // For now, hardcode a result (we'll add AI in Phase 5)
  const mockResult = {
    city: 'Tokyo',
    country: 'Japan',
    explanation: 'Based on your answers, you seem to thrive in vibrant, fast-paced environments with excellent public transportation and diverse food scenes. Tokyo offers all of this with a unique blend of traditional and ultra-modern culture.'
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 flex items-center justify-center">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Your Perfect Match
          </h1>
          <p className="text-gray-600">Based on your preferences...</p>
        </div>
        
        {/* Result */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🗾</div>
          <h2 className="text-5xl font-bold text-zillow-blue mb-2">
            {mockResult.city}
          </h2>
          <p className="text-2xl text-gray-600">{mockResult.country}</p>
        </div>
        
        {/* Explanation */}
        <div className="bg-blue-50 rounded-xl p-6 mb-8">
          <h3 className="font-semibold text-gray-800 mb-2">Why this city?</h3>
          <p className="text-gray-700 leading-relaxed">
            {mockResult.explanation}
          </p>
        </div>
        
        {/* Answers summary */}
        <details className="mb-8">
          <summary className="cursor-pointer text-gray-600 hover:text-gray-800 font-medium">
            View your answers ({answers.length} total)
          </summary>
          <div className="mt-4 space-y-2 max-h-64 overflow-y-auto">
            {answers.map((answer, index) => (
              <div key={index} className="text-sm bg-gray-50 p-3 rounded-lg">
                <span className="font-medium">{answer.category}:</span>{' '}
                {answer.selectedOption}
              </div>
            ))}
          </div>
        </details>
        
        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={onRestart}
            className="flex-1 py-3 px-6 bg-gray-100 hover:bg-gray-200 rounded-xl font-semibold text-gray-700 transition-all"
          >
            Try Again
          </button>
          <button className="flex-1 py-3 px-6 bg-zillow-blue hover:bg-blue-600 rounded-xl font-semibold text-white transition-all">
            Share Result
          </button>
        </div>
      </div>
    </div>
  )
}
```

### Step 4.2: Create Custom Hook for Game State
**Create:** `src/hooks/useGameState.js`

```javascript
import { useState, useEffect } from 'react'

const STORAGE_KEY = 'whereToMoveGame'

export function useGameState() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState([])
  const [gamePhase, setGamePhase] = useState('questions') // 'questions' | 'results'
  
  // Load saved state on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const { currentQuestionIndex: savedIndex, answers: savedAnswers } = JSON.parse(saved)
        setCurrentQuestionIndex(savedIndex)
        setAnswers(savedAnswers)
        
        // If game was completed, show results
        if (savedAnswers.length === 20) {
          setGamePhase('results')
        }
      } catch (error) {
        console.error('Failed to load saved game:', error)
        localStorage.removeItem(STORAGE_KEY)
      }
    }
  }, [])
  
  // Save state whenever it changes
  useEffect(() => {
    if (answers.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        currentQuestionIndex,
        answers,
        timestamp: Date.now()
      }))
    }
  }, [currentQuestionIndex, answers])
  
  const addAnswer = (answer) => {
    const newAnswers = [...answers, answer]
    setAnswers(newAnswers)
    
    if (newAnswers.length === 20) {
      setGamePhase('results')
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }
  
  const restart = () => {
    setCurrentQuestionIndex(0)
    setAnswers([])
    setGamePhase('questions')
    localStorage.removeItem(STORAGE_KEY)
  }
  
  return {
    currentQuestionIndex,
    answers,
    gamePhase,
    addAnswer,
    restart
  }
}
```

### Step 4.3: Update App to Use Game State Hook
**Edit:** `src/App.jsx`

```jsx
import SwipeCard from './components/SwipeCard'
import ResultsPage from './components/ResultsPage'
import { questions } from '../questions'
import { useGameState } from './hooks/useGameState'

function App() {
  const { currentQuestionIndex, answers, gamePhase, addAnswer, restart } = useGameState()
  
  const handleAnswer = (direction) => {
    const currentQuestion = questions[currentQuestionIndex]
    const newAnswer = {
      questionId: currentQuestion.id,
      category: currentQuestion.category,
      direction: direction,
      selectedOption: currentQuestion.options[direction]
    }
    
    addAnswer(newAnswer)
  }
  
  // Show results page if game is complete
  if (gamePhase === 'results') {
    return <ResultsPage answers={answers} onRestart={restart} />
  }
  
  // Show question cards
  const currentQuestion = questions[currentQuestionIndex]
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <SwipeCard 
        key={currentQuestionIndex}
        question={currentQuestion}
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={questions.length}
        onAnswer={handleAnswer}
      />
    </div>
  )
}

export default App
```

### Step 4.4: Add Loading State Between Phases
**Enhancement:** Show a brief "calculating" animation when transitioning to results

**Create:** `src/components/LoadingScreen.jsx`

```jsx
export default function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4 animate-bounce">🌍</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Analyzing your preferences...
        </h2>
        <p className="text-gray-600">Finding your perfect match</p>
      </div>
    </div>
  )
}
```

**Update App.jsx to show loading:**
```jsx
const [isCalculating, setIsCalculating] = useState(false)

const handleAnswer = (direction) => {
  const currentQuestion = questions[currentQuestionIndex]
  const newAnswer = { /* ... */ }
  
  addAnswer(newAnswer)
  
  // Show loading screen briefly if this was the last question
  if (currentQuestionIndex === questions.length - 1) {
    setIsCalculating(true)
    setTimeout(() => setIsCalculating(false), 2000)
  }
}

// Add this before the results check:
if (isCalculating) {
  return <LoadingScreen />
}
```

### Step 4.5: Test Persistence
**Testing checklist:**
- [ ] Complete game, refresh page, still see results
- [ ] Partially complete game, refresh page, continue from where you left off
- [ ] Restart button clears localStorage
- [ ] No errors when localStorage is disabled
- [ ] State saves after each swipe

### ✅ Success Criteria:
- [ ] Results page displays after 20 questions
- [ ] Progress persists across page refreshes
- [ ] Restart button works correctly
- [ ] Loading animation shows between phases
- [ ] Can view all answers in results page
- [ ] localStorage is used correctly (no errors)

### 💡 Learning Points:
- **Custom React hooks:** Extracting logic for reusability
- **localStorage API:** Persisting state in the browser
- **Error handling:** Try/catch for JSON parsing
- **Conditional rendering:** Showing different screens based on state

---

## 📋 Phase 5: AI Integration with Gemini
**Time Estimate:** 4-5 hours  
**Goal:** Get real city recommendations from Google Gemini AI

### Step 5.1: Get Gemini API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with Google account
3. Click "Create API Key"
4. Copy the key (you'll use it in Vercel)

### Step 5.2: Create Vercel Serverless Function
**Create:** `api/gemini.js`

```javascript
import { GoogleGenerativeAI } from '@google/generative-ai'

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }
  
  try {
    const { answers } = req.body
    
    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({ error: 'Invalid request: answers required' })
    }
    
    // Initialize Gemini
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
    
    // Build the prompt
    const prompt = buildPrompt(answers)
    
    // Get AI response
    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()
    
    // Parse JSON from response
    const cityMatch = parseAIResponse(text)
    
    return res.status(200).json(cityMatch)
    
  } catch (error) {
    console.error('Gemini API error:', error)
    return res.status(500).json({ 
      error: 'Failed to generate city match',
      details: error.message 
    })
  }
}

function buildPrompt(answers) {
  const answersSummary = answers.map(a => 
    `${a.category}: ${a.selectedOption}`
  ).join('\n')
  
  return `You are a relocation expert. Based on the following user preferences, recommend ONE specific city/country match.

User Preferences:
${answersSummary}

Respond ONLY with valid JSON in this exact format (no markdown, no extra text):
{
  "city": "City Name",
  "country": "Country Name",
  "explanation": "2-3 sentence explanation of why this city matches their preferences"
}

Choose a real, specific city. Consider all factors: climate, lifestyle, culture, cost of living, etc.`
}

function parseAIResponse(text) {
  try {
    // Remove markdown code blocks if present
    const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
    return JSON.parse(cleaned)
  } catch (error) {
    throw new Error('Failed to parse AI response: ' + text)
  }
}
```

### Step 5.3: Install Gemini SDK
```bash
npm install @google/generative-ai
```

### Step 5.4: Create Vercel Configuration
**Create:** `vercel.json`

```json
{
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/api/$1" }
  ],
  "env": {
    "GEMINI_API_KEY": "@GEMINI_API_KEY"
  }
}
```

### Step 5.5: Update Results Page to Call API
**Edit:** `src/components/ResultsPage.jsx`

```jsx
import { useState, useEffect } from 'react'

export default function ResultsPage({ answers, onRestart }) {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    fetchCityMatch()
  }, [])
  
  const fetchCityMatch = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers })
      })
      
      if (!response.ok) {
        throw new Error('Failed to get city match')
      }
      
      const data = await response.json()
      setResult(data)
      
    } catch (err) {
      console.error('API error:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
  
  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">🌍</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Finding your perfect city...
          </h2>
          <p className="text-gray-600">Powered by AI</p>
        </div>
      </div>
    )
  }
  
  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-md bg-white rounded-2xl shadow-2xl p-8 text-center">
          <div className="text-6xl mb-4">😞</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => fetchCityMatch()}
            className="px-6 py-3 bg-zillow-blue hover:bg-blue-600 rounded-xl font-semibold text-white transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }
  
  // Results display (same as before, but use {result.city} instead of mockResult)
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 flex items-center justify-center">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
        {/* ... same structure as Phase 4, but display real result ... */}
        <h2 className="text-5xl font-bold text-zillow-blue mb-2">
          {result.city}
        </h2>
        <p className="text-2xl text-gray-600">{result.country}</p>
        
        <div className="bg-blue-50 rounded-xl p-6 mb-8">
          <h3 className="font-semibold text-gray-800 mb-2">Why this city?</h3>
          <p className="text-gray-700 leading-relaxed">
            {result.explanation}
          </p>
        </div>
        {/* ... rest of component ... */}
      </div>
    </div>
  )
}
```

### Step 5.6: Test Locally with Vercel CLI
```bash
# Install Vercel CLI globally
npm install -g vercel

# Run local development server (simulates Vercel environment)
vercel dev
```

**Set environment variable locally:**
Create `.env.local`:
```
GEMINI_API_KEY=your_api_key_here
```

**Add to `.gitignore`:**
```
.env.local
```

### Step 5.7: Deploy to Vercel
```bash
# Login to Vercel
vercel login

# Deploy
vercel --prod
```

**Set environment variable in Vercel dashboard:**
1. Go to project settings
2. Navigate to "Environment Variables"
3. Add `GEMINI_API_KEY` with your API key
4. Redeploy

### Step 5.8: Test AI Responses
**Testing checklist:**
- [ ] API responds within 3-5 seconds
- [ ] Returns valid JSON with city, country, explanation
- [ ] Explanation makes sense for the given answers
- [ ] Error handling works (try with invalid API key)
- [ ] Rate limiting doesn't cause issues (test multiple times)
- [ ] Works on deployed Vercel site, not just locally

### ✅ Success Criteria:
- [ ] Real AI-powered city recommendations working
- [ ] API is secure (key not exposed to frontend)
- [ ] Loading states handle API delay gracefully
- [ ] Error handling provides good user experience
- [ ] Deployed to Vercel successfully
- [ ] Environment variables configured correctly

### 💡 Learning Points:
- **Serverless functions:** Backend code without a server
- **API security:** Protecting keys with environment variables
- **Async/await:** Handling promises in React
- **Error boundaries:** Graceful degradation
- **Vercel deployment:** Modern hosting for SPAs

---

## 📋 Phase 6: Google Maps Background
**Time Estimate:** 2-3 hours  
**Goal:** Add dynamic map backgrounds that change with each question

### Step 6.1: Get Google Maps API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable "Maps JavaScript API"
4. Create credentials → API Key
5. Restrict key to "Maps JavaScript API" (security)

### Step 6.2: Install Google Maps Script Loader
```bash
npm install @googlemaps/js-api-loader
```

### Step 6.3: Create Map Background Component
**Create:** `src/components/MapBackground.jsx`

```jsx
import { useEffect, useRef } from 'react'
import { Loader } from '@googlemaps/js-api-loader'

const CITIES = [
  { name: 'Tokyo', lat: 35.6762, lng: 139.6503 },
  { name: 'Paris', lat: 48.8566, lng: 2.3522 },
  { name: 'New York', lat: 40.7128, lng: -74.0060 },
  { name: 'Sydney', lat: -33.8688, lng: 151.2093 },
  { name: 'Barcelona', lat: 41.3851, lng: 2.1734 },
  { name: 'Dubai', lat: 25.2048, lng: 55.2708 },
  { name: 'Singapore', lat: 1.3521, lng: 103.8198 },
  { name: 'London', lat: 51.5074, lng: -0.1278 },
  { name: 'Rio de Janeiro', lat: -22.9068, lng: -43.1729 },
  { name: 'Bangkok', lat: 13.7563, lng: 100.5018 },
  { name: 'Cape Town', lat: -33.9249, lng: 18.4241 },
  { name: 'Istanbul', lat: 41.0082, lng: 28.9784 },
  { name: 'Vancouver', lat: 49.2827, lng: -123.1207 },
  { name: 'Buenos Aires', lat: -34.6037, lng: -58.3816 },
  { name: 'Amsterdam', lat: 52.3676, lng: 4.9041 },
]

export default function MapBackground({ questionNumber }) {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  
  useEffect(() => {
    const loader = new Loader({
      apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
      version: 'weekly',
    })
    
    loader.load().then(() => {
      if (mapRef.current && !mapInstanceRef.current) {
        // Initialize map
        mapInstanceRef.current = new google.maps.Map(mapRef.current, {
          zoom: 12,
          center: getRandomCity(),
          disableDefaultUI: true,
          gestureHandling: 'none',
          zoomControl: false,
          styles: [
            {
              featureType: 'all',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            }
          ]
        })
      }
    })
  }, [])
  
  // Change city when question changes
  useEffect(() => {
    if (mapInstanceRef.current) {
      const newCity = getRandomCity()
      mapInstanceRef.current.panTo(newCity)
    }
  }, [questionNumber])
  
  const getRandomCity = () => {
    const city = CITIES[Math.floor(Math.random() * CITIES.length)]
    return { lat: city.lat, lng: city.lng }
  }
  
  return (
    <div 
      ref={mapRef}
      className="fixed inset-0 -z-10 opacity-20"
      style={{ filter: 'blur(2px)' }}
    />
  )
}
```

### Step 6.4: Add Environment Variable for Maps Key
**Create/Edit:** `.env.local`
```
VITE_GOOGLE_MAPS_API_KEY=your_maps_api_key_here
```

**Add to Vercel environment variables:**
- Variable name: `VITE_GOOGLE_MAPS_API_KEY`
- Value: Your Google Maps API key

### Step 6.5: Integrate Map into App
**Edit:** `src/App.jsx`

```jsx
import MapBackground from './components/MapBackground'

function App() {
  // ... existing code ...
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <MapBackground questionNumber={currentQuestionIndex} />
      <SwipeCard 
        key={currentQuestionIndex}
        question={currentQuestion}
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={questions.length}
        onAnswer={handleAnswer}
      />
    </div>
  )
}
```

### Step 6.6: Optimize Performance
**Enhancements:**
- Lazy load map (only initialize when visible)
- Debounce city changes
- Cache map instance
- Reduce API calls (use static map images as fallback)

### ✅ Success Criteria:
- [ ] Map loads in background (subtle, not distracting)
- [ ] City changes with each new question
- [ ] Map doesn't block interactions with card
- [ ] Performance is good (no lag)
- [ ] Works on mobile
- [ ] Stays within Maps API free tier

### 💡 Learning Points:
- **Google Maps API:** Loading and configuring maps
- **Environment variables:** Using Vite's import.meta.env
- **useRef hook:** Storing mutable values across renders
- **Performance optimization:** Avoiding unnecessary re-renders

---

## 📋 Phase 7: Polish & Mobile Optimization
**Time Estimate:** 2-3 hours  
**Goal:** Final touches for production-ready app

### Step 7.1: Add Error Boundaries
**Create:** `src/components/ErrorBoundary.jsx`

```jsx
import { Component } from 'react'

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
          <div className="max-w-md bg-white rounded-2xl shadow-2xl p-8 text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Something went wrong
            </h2>
            <p className="text-gray-600 mb-6">
              We encountered an unexpected error. Please refresh the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-zillow-blue hover:bg-blue-600 rounded-xl font-semibold text-white transition-all"
            >
              Refresh Page
            </button>
          </div>
        </div>
      )
    }
    
    return this.props.children
  }
}
```

**Wrap App in ErrorBoundary (`src/main.jsx`):**
```jsx
import { ErrorBoundary } from './components/ErrorBoundary'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)
```

### Step 7.2: Improve Mobile UX
**Mobile-specific enhancements:**

1. **Prevent overscroll bounce:**
```css
/* Add to index.css */
body {
  overscroll-behavior: none;
  -webkit-overflow-scrolling: touch;
}
```

2. **Add viewport meta tag (should already exist in `index.html`):**
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
```

3. **Add touch-friendly targets:**
```jsx
// Ensure all buttons are at least 44x44px (iOS guideline)
className="min-h-[44px] min-w-[44px] ..."
```

4. **Add haptic feedback (iOS):**
```jsx
const triggerHaptic = () => {
  if (window.navigator.vibrate) {
    window.navigator.vibrate(10)
  }
}

// Call on swipe complete
```

### Step 7.3: Add Loading Skeletons
**Create:** `src/components/CardSkeleton.jsx`

```jsx
export default function CardSkeleton() {
  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-2xl shadow-2xl animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-32 mx-auto mb-4"></div>
      <div className="h-2 bg-gray-200 rounded mb-6"></div>
      <div className="h-6 bg-gray-200 rounded w-24 mb-4"></div>
      <div className="h-8 bg-gray-200 rounded mb-8"></div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded"></div>
      </div>
    </div>
  )
}
```

### Step 7.4: Add Meta Tags for Social Sharing
**Edit:** `index.html`

```html
<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/svg+xml" href="/vite.svg" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
  <!-- Primary Meta Tags -->
  <title>Where Should I Move? - Find Your Perfect City</title>
  <meta name="title" content="Where Should I Move? - Find Your Perfect City">
  <meta name="description" content="Swipe through fun questions to discover your ideal city match. Powered by AI.">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://your-app.vercel.app/">
  <meta property="og:title" content="Where Should I Move? - Find Your Perfect City">
  <meta property="og:description" content="Swipe through fun questions to discover your ideal city match. Powered by AI.">
  <meta property="og:image" content="https://your-app.vercel.app/og-image.png">
  
  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="https://your-app.vercel.app/">
  <meta property="twitter:title" content="Where Should I Move? - Find Your Perfect City">
  <meta property="twitter:description" content="Swipe through fun questions to discover your ideal city match. Powered by AI.">
  <meta property="twitter:image" content="https://your-app.vercel.app/og-image.png">
</head>
```

### Step 7.5: Add Analytics (Optional)
**Using Vercel Analytics:**
```bash
npm install @vercel/analytics
```

**Add to App.jsx:**
```jsx
import { Analytics } from '@vercel/analytics/react'

function App() {
  return (
    <>
      {/* Your app content */}
      <Analytics />
    </>
  )
}
```

### Step 7.6: Performance Checklist
- [ ] Lighthouse score > 90 (all categories)
- [ ] Images optimized (use WebP format)
- [ ] Code splitting (Vite does this automatically)
- [ ] Lazy load non-critical components
- [ ] Minimize bundle size (check with `npm run build`)

### Step 7.7: Final Testing Checklist
**Cross-browser testing:**
- [ ] Chrome/Edge (desktop & mobile)
- [ ] Safari (desktop & iOS)
- [ ] Firefox

**Feature testing:**
- [ ] Complete full game flow 3+ times
- [ ] Test with different answer combinations
- [ ] Verify localStorage persistence
- [ ] Test offline behavior
- [ ] Check API error handling
- [ ] Verify mobile swipe gestures
- [ ] Test on slow 3G network

**Accessibility:**
- [ ] Keyboard navigation works
- [ ] Screen reader friendly (test basic flow)
- [ ] Color contrast meets WCAG AA
- [ ] Focus states visible

### ✅ Success Criteria:
- [ ] App works flawlessly on all major browsers
- [ ] Mobile experience is smooth and native-feeling
- [ ] Error handling is comprehensive
- [ ] Performance metrics are excellent
- [ ] Ready for public launch

---

## 📋 Phase 8: 8-Direction Swipes (Future Enhancement)
**Time Estimate:** 5-6 hours  
**Goal:** Implement multi-choice questions with 8-directional swipes

### Overview
This phase adds support for multiple-choice questions where users swipe in 8 directions (↑ ↓ ← → ↖ ↗ ↙ ↘) to select from 8 options.

### Step 8.1: Update Question Data Structure
**Edit:** `questions.js`

Add multi-choice questions:
```javascript
{
  id: 21,
  category: 'Lifestyle',
  text: 'Pick your ideal weekend vibe:',
  type: 'multiChoice',
  options: {
    'up': 'Mountain hiking',
    'up-right': 'Beach volleyball',
    'right': 'Shopping downtown',
    'down-right': 'Museum hopping',
    'down': 'Netflix marathon',
    'down-left': 'Cozy cafe reading',
    'left': 'Concert/live music',
    'up-left': 'Outdoor cycling'
  }
}
```

### Step 8.2: Implement 8-Direction Gesture Detection
**Create:** `src/utils/swipeDetection.js`

```javascript
export function getSwipeDirection(offsetX, offsetY) {
  const angle = Math.atan2(offsetY, offsetX) * (180 / Math.PI)
  
  // Normalize angle to 0-360
  const normalizedAngle = (angle + 360) % 360
  
  // Map angle to 8 directions
  if (normalizedAngle >= 337.5 || normalizedAngle < 22.5) return 'right'
  if (normalizedAngle >= 22.5 && normalizedAngle < 67.5) return 'down-right'
  if (normalizedAngle >= 67.5 && normalizedAngle < 112.5) return 'down'
  if (normalizedAngle >= 112.5 && normalizedAngle < 157.5) return 'down-left'
  if (normalizedAngle >= 157.5 && normalizedAngle < 202.5) return 'left'
  if (normalizedAngle >= 202.5 && normalizedAngle < 247.5) return 'up-left'
  if (normalizedAngle >= 247.5 && normalizedAngle < 292.5) return 'up'
  if (normalizedAngle >= 292.5 && normalizedAngle < 337.5) return 'up-right'
}
```

### Step 8.3: Create Multi-Choice Card Component
**Create:** `src/components/MultiChoiceCard.jsx`

```jsx
import { motion, useMotionValue } from 'framer-motion'
import { getSwipeDirection } from '../utils/swipeDetection'

export default function MultiChoiceCard({ question, onAnswer }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const handleDragEnd = (event, info) => {
    const distance = Math.sqrt(info.offset.x ** 2 + info.offset.y ** 2)
    
    if (distance > 100) {
      const direction = getSwipeDirection(info.offset.x, info.offset.y)
      onAnswer(direction)
    }
  }
  
  return (
    <motion.div
      className="relative max-w-md mx-auto mt-20 p-8 bg-white rounded-2xl shadow-2xl"
      style={{ x, y }}
      drag
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      onDragEnd={handleDragEnd}
    >
      {/* 8 directional indicators */}
      <DirectionalHints options={question.options} x={x} y={y} />
      
      <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
        {question.text}
      </h2>
      
      <div className="text-center text-sm text-gray-500">
        Swipe in any direction to choose
      </div>
    </motion.div>
  )
}
```

### Step 8.4: Add Visual Direction Indicators
Show all 8 options around the card as user drags:

```jsx
function DirectionalHints({ options, x, y }) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Up */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full p-2 bg-black/70 text-white text-xs rounded">
        {options.up}
      </div>
      {/* Up-Right */}
      <div className="absolute top-0 right-0 -translate-y-full translate-x-1/2 p-2 bg-black/70 text-white text-xs rounded">
        {options['up-right']}
      </div>
      {/* ... repeat for all 8 directions ... */}
    </div>
  )
}
```

### ✅ Success Criteria:
- [ ] 8-direction swipe detection works accurately
- [ ] Visual feedback shows all 8 options
- [ ] Angle calculation is precise
- [ ] Works smoothly on touch devices

---

## 🎉 Completion Checklist

### MVP Features (Phases 0-5)
- [ ] React + Vite project set up
- [ ] Tailwind CSS configured with Zillow blue
- [ ] 20 questions display in cards
- [ ] Swipe gestures work smoothly
- [ ] Progress persists in localStorage
- [ ] AI-powered city matching via Gemini
- [ ] Results page shows personalized recommendations
- [ ] Deployed to Vercel

### Polish Features (Phases 6-7)
- [ ] Google Maps backgrounds
- [ ] Mobile-optimized UX
- [ ] Error boundaries implemented
- [ ] Loading states polished
- [ ] Social sharing meta tags
- [ ] Performance optimized

### Future Enhancements (Phase 8+)
- [ ] 8-direction multi-choice questions
- [ ] Neighborhood matching (Phase 2 of game)
- [ ] User accounts & saved matches
- [ ] Share results on social media
- [ ] A/B test different question sets

---

## 🚀 Next Steps After Completion

1. **Gather feedback:** Share with friends and collect user feedback
2. **Analytics:** Review Vercel Analytics to see usage patterns
3. **Iterate:** Refine questions based on user responses
4. **Market:** Share on Product Hunt, Reddit, HackerNews
5. **Scale:** Consider adding more advanced features

---

## 📚 Resources & Documentation

- **React Docs:** https://react.dev
- **Tailwind CSS:** https://tailwindcss.com/docs
- **Framer Motion:** https://www.framer.com/motion/
- **Google Gemini API:** https://ai.google.dev/docs
- **Vercel Deployment:** https://vercel.com/docs
- **Google Maps API:** https://developers.google.com/maps/documentation

---

## 💬 Getting Help

If you get stuck:
1. Check the console for error messages
2. Read the error carefully (often points to the solution)
3. Google the error message
4. Ask GitHub Copilot for help with specific code issues
5. Check the relevant documentation
6. Take a break and come back with fresh eyes!

Remember: **Every developer gets stuck. It's part of the process!** 🚀
