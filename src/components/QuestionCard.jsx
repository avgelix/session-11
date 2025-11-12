import PropTypes from 'prop-types';

/**
 * QuestionCard Component
 * 
 * Displays a single question card with:
 * - Progress indicator showing current question number
 * - Category badge with Zillow blue color
 * - Question text
 * - Options display (not interactive in this phase)
 * 
 * Designed to be responsive and look beautiful across all device sizes
 */
function QuestionCard({ question, currentQuestion, totalQuestions }) {
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

        {/* Options Display (not interactive yet) */}
        <div className="mt-8 border-t border-gray-200 pt-6">
          <p className="text-sm text-gray-500 mb-4 text-center">
            {type === 'binary' ? 'Swipe left or right' : 'Swipe in any direction'}
          </p>
          
          {type === 'binary' ? (
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl mb-1">←</div>
                <p className="text-xs text-gray-600">{options.left}</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl mb-1">→</div>
                <p className="text-xs text-gray-600">{options.right}</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="text-center p-2 bg-gray-50 rounded">
                <div className="text-lg mb-1">↖</div>
                <p className="text-gray-600 truncate">{options.upLeft}</p>
              </div>
              <div className="text-center p-2 bg-gray-50 rounded">
                <div className="text-lg mb-1">↑</div>
                <p className="text-gray-600 truncate">{options.up}</p>
              </div>
              <div className="text-center p-2 bg-gray-50 rounded">
                <div className="text-lg mb-1">↗</div>
                <p className="text-gray-600 truncate">{options.upRight}</p>
              </div>
              <div className="text-center p-2 bg-gray-50 rounded">
                <div className="text-lg mb-1">←</div>
                <p className="text-gray-600 truncate">{options.left}</p>
              </div>
              <div className="text-center p-2 bg-gray-50 rounded">
                <div className="text-lg">•</div>
              </div>
              <div className="text-center p-2 bg-gray-50 rounded">
                <div className="text-lg mb-1">→</div>
                <p className="text-gray-600 truncate">{options.right}</p>
              </div>
              <div className="text-center p-2 bg-gray-50 rounded">
                <div className="text-lg mb-1">↙</div>
                <p className="text-gray-600 truncate">{options.downLeft}</p>
              </div>
              <div className="text-center p-2 bg-gray-50 rounded">
                <div className="text-lg mb-1">↓</div>
                <p className="text-gray-600 truncate">{options.down}</p>
              </div>
              <div className="text-center p-2 bg-gray-50 rounded">
                <div className="text-lg mb-1">↘</div>
                <p className="text-gray-600 truncate">{options.downRight}</p>
              </div>
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
};

export default QuestionCard;
