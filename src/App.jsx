import { useState } from 'react';
import QuestionCard from './components/QuestionCard';
import { questions } from '../questions';

function App() {
  const [currentQuestionIndex] = useState(0);
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-8">
      <div className="w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-zillow-blue mb-2">
            Where to Move Game
          </h1>
          <p className="text-gray-600">
            Discover your perfect city through our card-swiping adventure
          </p>
        </div>
        
        <QuestionCard 
          question={currentQuestion}
          currentQuestion={currentQuestionIndex + 1}
          totalQuestions={questions.length}
        />
      </div>
    </div>
  )
}

export default App
