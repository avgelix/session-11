import { useState } from 'react';
import SwipeCard from './components/SwipeCard';
import { questions } from '../questions';

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (answer) => {
    // Store the answer with question context
    const newAnswer = {
      questionId: currentQuestion.id,
      category: currentQuestion.category,
      question: currentQuestion.text,
      answer: answer
    };
    
    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);
    
    // Check if this is the last question
    if (currentQuestionIndex === questions.length - 1) {
      console.log('All questions completed! Final answers:', updatedAnswers);
    } else {
      // Move to next question
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

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
        
        <SwipeCard 
          key={currentQuestionIndex}
          question={currentQuestion}
          currentQuestion={currentQuestionIndex + 1}
          totalQuestions={questions.length}
          onAnswer={handleAnswer}
        />
      </div>
    </div>
  )
}

export default App
