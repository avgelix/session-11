import PropTypes from 'prop-types';

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

  return (
    <div className="w-full max-w-md mx-auto px-4">
      {/* Progress Indicator */}
      <div className="mb-6">
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
      <div className="bg-white rounded-2xl shadow-xl p-8 min-h-[400px] flex flex-col justify-between">
        {/* Category Badge */}
        <div className="mb-6">
          <span className="inline-block bg-zillow-blue text-white text-sm font-semibold px-4 py-2 rounded-full">
            {category}
          </span>
        </div>

        {/* Question Text */}
        <div className="flex-grow flex items-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 leading-relaxed">
            {text}
          </h2>
        </div>

        {/* Interactive Buttons */}
        <div className="mt-8 border-t border-gray-200 pt-6">
          <p className="text-sm text-gray-500 mb-4 text-center">
            {type === 'binary' ? 'Click to choose' : 'Pick your preference'}
          </p>
          
          {type === 'binary' ? (
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => onAnswer(options.left)}
                className="text-center p-4 bg-gray-50 rounded-lg hover:bg-zillow-blue hover:text-white transition-all duration-200 active:scale-95 cursor-pointer border-2 border-transparent hover:border-zillow-blue"
              >
                <div className="text-3xl mb-2">←</div>
                <p className="text-sm font-medium">{options.left}</p>
              </button>
              <button
                onClick={() => onAnswer(options.right)}
                className="text-center p-4 bg-gray-50 rounded-lg hover:bg-zillow-blue hover:text-white transition-all duration-200 active:scale-95 cursor-pointer border-2 border-transparent hover:border-zillow-blue"
              >
                <div className="text-3xl mb-2">→</div>
                <p className="text-sm font-medium">{options.right}</p>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => onAnswer(options.upLeft)}
                className="text-center p-3 bg-gray-50 rounded hover:bg-zillow-blue hover:text-white transition-all duration-200 active:scale-95 cursor-pointer border-2 border-transparent hover:border-zillow-blue"
              >
                <div className="text-xl mb-1">↖</div>
                <p className="text-xs font-medium truncate">{options.upLeft}</p>
              </button>
              <button
                onClick={() => onAnswer(options.up)}
                className="text-center p-3 bg-gray-50 rounded hover:bg-zillow-blue hover:text-white transition-all duration-200 active:scale-95 cursor-pointer border-2 border-transparent hover:border-zillow-blue"
              >
                <div className="text-xl mb-1">↑</div>
                <p className="text-xs font-medium truncate">{options.up}</p>
              </button>
              <button
                onClick={() => onAnswer(options.upRight)}
                className="text-center p-3 bg-gray-50 rounded hover:bg-zillow-blue hover:text-white transition-all duration-200 active:scale-95 cursor-pointer border-2 border-transparent hover:border-zillow-blue"
              >
                <div className="text-xl mb-1">↗</div>
                <p className="text-xs font-medium truncate">{options.upRight}</p>
              </button>
              <button
                onClick={() => onAnswer(options.left)}
                className="text-center p-3 bg-gray-50 rounded hover:bg-zillow-blue hover:text-white transition-all duration-200 active:scale-95 cursor-pointer border-2 border-transparent hover:border-zillow-blue"
              >
                <div className="text-xl mb-1">←</div>
                <p className="text-xs font-medium truncate">{options.left}</p>
              </button>
              <div className="text-center p-3 bg-gray-50 rounded">
                <div className="text-xl">•</div>
              </div>
              <button
                onClick={() => onAnswer(options.right)}
                className="text-center p-3 bg-gray-50 rounded hover:bg-zillow-blue hover:text-white transition-all duration-200 active:scale-95 cursor-pointer border-2 border-transparent hover:border-zillow-blue"
              >
                <div className="text-xl mb-1">→</div>
                <p className="text-xs font-medium truncate">{options.right}</p>
              </button>
              <button
                onClick={() => onAnswer(options.downLeft)}
                className="text-center p-3 bg-gray-50 rounded hover:bg-zillow-blue hover:text-white transition-all duration-200 active:scale-95 cursor-pointer border-2 border-transparent hover:border-zillow-blue"
              >
                <div className="text-xl mb-1">↙</div>
                <p className="text-xs font-medium truncate">{options.downLeft}</p>
              </button>
              <button
                onClick={() => onAnswer(options.down)}
                className="text-center p-3 bg-gray-50 rounded hover:bg-zillow-blue hover:text-white transition-all duration-200 active:scale-95 cursor-pointer border-2 border-transparent hover:border-zillow-blue"
              >
                <div className="text-xl mb-1">↓</div>
                <p className="text-xs font-medium truncate">{options.down}</p>
              </button>
              <button
                onClick={() => onAnswer(options.downRight)}
                className="text-center p-3 bg-gray-50 rounded hover:bg-zillow-blue hover:text-white transition-all duration-200 active:scale-95 cursor-pointer border-2 border-transparent hover:border-zillow-blue"
              >
                <div className="text-xl mb-1">↘</div>
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
