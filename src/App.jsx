import QuestionCard from './components/QuestionCard';
import ResultsPage from './components/ResultsPage';
import LoadingScreen from './components/LoadingScreen';
import useGameState from './hooks/useGameState';
import { questions } from '../questions';

function App() {
  const { 
    currentQuestionIndex, 
    answers, 
    gamePhase, 
    setGamePhase,
    addAnswer, 
    restart 
  } = useGameState();

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (answer) => {
    // Store the answer with question context
    const newAnswer = {
      questionId: currentQuestion.id,
      category: currentQuestion.category,
      question: currentQuestion.text,
      answer: answer
    };
    
    addAnswer(newAnswer);
  };

  const handleLoadingComplete = () => {
    setGamePhase('results');
  };

  // Render different screens based on game phase
  if (gamePhase === 'loading') {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  if (gamePhase === 'results') {
    return <ResultsPage answers={answers} onRestart={restart} />;
  }

  // Default: Questions phase
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
          onAnswer={handleAnswer}
        />
      </div>
    </div>
  )
}

export default App
