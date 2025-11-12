import { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * ResultsPage Component
 * 
 * Displays the matched city result after completing all 20 questions
 * Shows:
 * - City match with explanation
 * - Collapsible answers summary
 * - Try Again and Share buttons
 */
function ResultsPage({ answers, onRestart }) {
  const [showAnswers, setShowAnswers] = useState(false);

  // Mock city match for MVP (will be replaced with AI in Phase 2)
  const cityMatch = {
    city: 'Tokyo',
    country: 'Japan',
    explanation: `Based on your preferences, Tokyo is your perfect match! You appreciate a vibrant urban lifestyle with access to incredible food diversity, efficient public transportation, and a dynamic cultural scene. Tokyo offers the perfect blend of modern technology and traditional culture, with something happening at all hours. The city's walkability, world-class transit system, and endless dining options align perfectly with your desire for an energetic, connected lifestyle.`
  };

  const handleShare = () => {
    const shareText = `I just discovered my perfect city: ${cityMatch.city}, ${cityMatch.country}! Take the "Where to Move" quiz to find yours.`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Where to Move Game',
        text: shareText,
      }).catch(() => {
        // Fallback to clipboard
        copyToClipboard(shareText);
      });
    } else {
      copyToClipboard(shareText);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Result copied to clipboard!');
    }).catch(() => {
      alert('Unable to copy to clipboard');
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-zillow-blue mb-2">
            Your Perfect Match!
          </h1>
          <p className="text-gray-600">
            Based on your answers, we found your ideal city
          </p>
        </div>

        {/* City Match Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">🗼</div>
            <h2 className="text-4xl font-bold text-gray-800 mb-2">
              {cityMatch.city}
            </h2>
            <p className="text-xl text-gray-600">{cityMatch.country}</p>
          </div>

          {/* Explanation */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Why {cityMatch.city}?
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {cityMatch.explanation}
            </p>
          </div>
        </div>

        {/* Collapsible Answers Summary */}
        <div className="bg-white rounded-2xl shadow-xl mb-6 overflow-hidden">
          <button
            onClick={() => setShowAnswers(!showAnswers)}
            className="w-full px-8 py-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <h3 className="text-lg font-semibold text-gray-800">
              View Your Answers ({answers.length})
            </h3>
            <span className="text-2xl text-zillow-blue">
              {showAnswers ? '−' : '+'}
            </span>
          </button>
          
          {showAnswers && (
            <div className="px-8 pb-6 border-t border-gray-200">
              <div className="mt-6 space-y-4">
                {answers.map((answer, index) => (
                  <div
                    key={answer.questionId}
                    className="border-l-4 border-zillow-blue pl-4 py-2"
                  >
                    <p className="text-sm text-gray-500 mb-1">
                      Question {index + 1} · {answer.category}
                    </p>
                    <p className="font-medium text-gray-800 mb-2">
                      {answer.question}
                    </p>
                    <p className="text-zillow-blue font-semibold">
                      → {answer.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={onRestart}
            className="bg-white text-zillow-blue border-2 border-zillow-blue px-8 py-4 rounded-lg font-semibold hover:bg-zillow-blue hover:text-white transition-all duration-200 active:scale-95"
          >
            🔄 Try Again
          </button>
          <button
            onClick={handleShare}
            className="bg-zillow-blue text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-600 transition-all duration-200 active:scale-95"
          >
            📤 Share Result
          </button>
        </div>
      </div>
    </div>
  );
}

ResultsPage.propTypes = {
  answers: PropTypes.arrayOf(
    PropTypes.shape({
      questionId: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
      question: PropTypes.string.isRequired,
      answer: PropTypes.string.isRequired,
    })
  ).isRequired,
  onRestart: PropTypes.func.isRequired,
};

export default ResultsPage;
