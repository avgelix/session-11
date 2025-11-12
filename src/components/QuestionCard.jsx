import PropTypes from 'prop-types';
import { triggerHaptic } from '../utils/haptics';

/**
 * QuestionCard Component
 * 
 * Displays a single question card with:
 * - Progress indicator showing current question number
 * - Category badge with Zillow blue color
 * - Question text
 * - Interactive buttons for answering
 * 
 * Designed to be responsive and look beautiful across all device sizes
 */
function QuestionCard({ question, currentQuestion, totalQuestions, onAnswer }) {
  const { category, text, type, options } = question;

  const handleAnswer = (answer) => {
    // Trigger haptic feedback on mobile devices
    triggerHaptic('light');
    onAnswer(answer);
  };

  return (
    <div className="w-full max-w-md mx-auto px-4">
      {/* Progress Indicator */}
      <div className="mb-6" role="progressbar" aria-valuenow={currentQuestion} aria-valuemin="1" aria-valuemax={totalQuestions} aria-label={`Question ${currentQuestion} of ${totalQuestions}`}>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600 font-medium">
            Question {currentQuestion} of {totalQuestions}
          </span>
          <span className="text-sm text-gray-500">
            {Math.round((currentQuestion / totalQuestions) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-zillow-blue h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-2xl shadow-xl p-8 min-h-[400px] flex flex-col justify-between" role="main">
        {/* Category Badge */}
        <div className="mb-6">
          <span className="inline-block bg-zillow-blue text-white text-sm font-semibold px-4 py-2 rounded-full" role="status" aria-label={`Category: ${category}`}>
            {category}
          </span>
        </div>

        {/* Question Text */}
        <div className="flex-grow flex items-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 leading-relaxed" id="question-text">
            {text}
          </h2>
        </div>

        {/* Interactive Buttons */}
        <div className="mt-8 border-t border-gray-200 pt-6" role="group" aria-labelledby="question-text">
          <p className="text-sm text-gray-500 mb-4 text-center" id="instruction-text">
            {type === 'binary' ? 'Click to choose' : 'Pick your preference'}
          </p>
          
          {type === 'binary' ? (
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleAnswer(options.left)}
                className="text-center p-4 bg-gray-50 rounded-lg hover:bg-zillow-blue hover:text-white transition-all duration-200 active:scale-95 cursor-pointer border-2 border-transparent hover:border-zillow-blue focus:outline-none focus:ring-2 focus:ring-zillow-blue focus:ring-offset-2"
                aria-label={`Choose: ${options.left}`}
              >
                <div className="text-3xl mb-2" aria-hidden="true">←</div>
                <p className="text-sm font-medium">{options.left}</p>
              </button>
              <button
                onClick={() => handleAnswer(options.right)}
                className="text-center p-4 bg-gray-50 rounded-lg hover:bg-zillow-blue hover:text-white transition-all duration-200 active:scale-95 cursor-pointer border-2 border-transparent hover:border-zillow-blue focus:outline-none focus:ring-2 focus:ring-zillow-blue focus:ring-offset-2"
                aria-label={`Choose: ${options.right}`}
              >
                <div className="text-3xl mb-2" aria-hidden="true">→</div>
                <p className="text-sm font-medium">{options.right}</p>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handleAnswer(options.upLeft)}
                className="text-center p-3 bg-gray-50 rounded hover:bg-zillow-blue hover:text-white transition-all duration-200 active:scale-95 cursor-pointer border-2 border-transparent hover:border-zillow-blue focus:outline-none focus:ring-2 focus:ring-zillow-blue focus:ring-offset-2"
                aria-label={`Choose: ${options.upLeft}`}
              >
                <div className="text-xl mb-1" aria-hidden="true">↖</div>
                <p className="text-xs font-medium truncate">{options.upLeft}</p>
              </button>
              <button
                onClick={() => handleAnswer(options.up)}
                className="text-center p-3 bg-gray-50 rounded hover:bg-zillow-blue hover:text-white transition-all duration-200 active:scale-95 cursor-pointer border-2 border-transparent hover:border-zillow-blue focus:outline-none focus:ring-2 focus:ring-zillow-blue focus:ring-offset-2"
                aria-label={`Choose: ${options.up}`}
              >
                <div className="text-xl mb-1" aria-hidden="true">↑</div>
                <p className="text-xs font-medium truncate">{options.up}</p>
              </button>
              <button
                onClick={() => handleAnswer(options.upRight)}
                className="text-center p-3 bg-gray-50 rounded hover:bg-zillow-blue hover:text-white transition-all duration-200 active:scale-95 cursor-pointer border-2 border-transparent hover:border-zillow-blue focus:outline-none focus:ring-2 focus:ring-zillow-blue focus:ring-offset-2"
                aria-label={`Choose: ${options.upRight}`}
              >
                <div className="text-xl mb-1" aria-hidden="true">↗</div>
                <p className="text-xs font-medium truncate">{options.upRight}</p>
              </button>
              <button
                onClick={() => handleAnswer(options.left)}
                className="text-center p-3 bg-gray-50 rounded hover:bg-zillow-blue hover:text-white transition-all duration-200 active:scale-95 cursor-pointer border-2 border-transparent hover:border-zillow-blue focus:outline-none focus:ring-2 focus:ring-zillow-blue focus:ring-offset-2"
                aria-label={`Choose: ${options.left}`}
              >
                <div className="text-xl mb-1" aria-hidden="true">←</div>
                <p className="text-xs font-medium truncate">{options.left}</p>
              </button>
              <div className="text-center p-3 bg-gray-50 rounded" aria-hidden="true">
                <div className="text-xl">•</div>
              </div>
              <button
                onClick={() => handleAnswer(options.right)}
                className="text-center p-3 bg-gray-50 rounded hover:bg-zillow-blue hover:text-white transition-all duration-200 active:scale-95 cursor-pointer border-2 border-transparent hover:border-zillow-blue focus:outline-none focus:ring-2 focus:ring-zillow-blue focus:ring-offset-2"
                aria-label={`Choose: ${options.right}`}
              >
                <div className="text-xl mb-1" aria-hidden="true">→</div>
                <p className="text-xs font-medium truncate">{options.right}</p>
              </button>
              <button
                onClick={() => handleAnswer(options.downLeft)}
                className="text-center p-3 bg-gray-50 rounded hover:bg-zillow-blue hover:text-white transition-all duration-200 active:scale-95 cursor-pointer border-2 border-transparent hover:border-zillow-blue focus:outline-none focus:ring-2 focus:ring-zillow-blue focus:ring-offset-2"
                aria-label={`Choose: ${options.downLeft}`}
              >
                <div className="text-xl mb-1" aria-hidden="true">↙</div>
                <p className="text-xs font-medium truncate">{options.downLeft}</p>
              </button>
              <button
                onClick={() => handleAnswer(options.down)}
                className="text-center p-3 bg-gray-50 rounded hover:bg-zillow-blue hover:text-white transition-all duration-200 active:scale-95 cursor-pointer border-2 border-transparent hover:border-zillow-blue focus:outline-none focus:ring-2 focus:ring-zillow-blue focus:ring-offset-2"
                aria-label={`Choose: ${options.down}`}
              >
                <div className="text-xl mb-1" aria-hidden="true">↓</div>
                <p className="text-xs font-medium truncate">{options.down}</p>
              </button>
              <button
                onClick={() => handleAnswer(options.downRight)}
                className="text-center p-3 bg-gray-50 rounded hover:bg-zillow-blue hover:text-white transition-all duration-200 active:scale-95 cursor-pointer border-2 border-transparent hover:border-zillow-blue focus:outline-none focus:ring-2 focus:ring-zillow-blue focus:ring-offset-2"
                aria-label={`Choose: ${options.downRight}`}
              >
                <div className="text-xl mb-1" aria-hidden="true">↘</div>
                <p className="text-xs font-medium truncate">{options.downRight}</p>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

QuestionCard.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['binary', 'multiChoice']).isRequired,
    options: PropTypes.object.isRequired,
  }).isRequired,
  currentQuestion: PropTypes.number.isRequired,
  totalQuestions: PropTypes.number.isRequired,
  onAnswer: PropTypes.func.isRequired,
};

export default QuestionCard;
