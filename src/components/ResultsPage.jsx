import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

/**
 * ResultsPage Component
 * 
 * Displays AI-generated city recommendation after user completes all questions.
 * Features:
 * - Loading state while fetching AI recommendation
 * - Error handling with retry option
 * - City match display with explanation
 * - Accept/Refuse actions
 */
function ResultsPage({ answers, onAccept, onRefuse }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cityMatch, setCityMatch] = useState(null);

  const fetchCityRecommendation = async () => {
    setLoading(true);
    setError(null);

    try {
      // Call Vercel serverless function
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch recommendation');
      }

      const data = await response.json();
      setCityMatch(data);
    } catch (err) {
      console.error('Error fetching city recommendation:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCityRecommendation();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center py-8">
        <div className="w-full max-w-md mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="mb-6">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-zillow-blue"></div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Finding Your Perfect Match...
            </h2>
            <p className="text-gray-600">
              Our AI is analyzing your preferences to find the ideal city for you.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center py-8">
        <div className="w-full max-w-md mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="mb-6">
              <div className="text-6xl">😞</div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Oops! Something Went Wrong
            </h2>
            <p className="text-gray-600 mb-6">
              {error}
            </p>
            <div className="flex gap-4">
              <button
                onClick={fetchCityRecommendation}
                className="flex-1 bg-zillow-blue text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={onRefuse}
                className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Start Over
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Success state - show city match
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-8">
      <div className="w-full max-w-md mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-zillow-blue mb-2">
            Your Perfect Match!
          </h1>
          <p className="text-gray-600">
            Based on your preferences, we found your ideal city
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* City Badge */}
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">🏙️</div>
            <h2 className="text-4xl font-bold text-gray-800 mb-2">
              {cityMatch.city}
            </h2>
            <p className="text-xl text-gray-600">{cityMatch.country}</p>
          </div>

          {/* Explanation */}
          <div className="mb-8 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Why This City?
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {cityMatch.explanation}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <button
              onClick={onAccept}
              className="w-full bg-zillow-blue text-white py-4 px-6 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
            >
              ✓ Love It! Let&apos;s Find a Neighborhood
            </button>
            <button
              onClick={onRefuse}
              className="w-full bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Not Quite Right - Try Again
            </button>
          </div>
        </div>

        {/* Fun fact or encouragement */}
        <div className="text-center mt-6 text-sm text-gray-500">
          <p>💡 Tip: Each answer shapes your perfect match!</p>
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
  onAccept: PropTypes.func.isRequired,
  onRefuse: PropTypes.func.isRequired,
};

export default ResultsPage;
