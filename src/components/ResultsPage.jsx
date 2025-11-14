import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import MapBackground from './MapBackground';

/**
 * ResultsPage Component
 * 
 * Displays AI-generated city recommendation after user completes all questions.
 * Features:
 * - Loading state while fetching AI recommendation
 * - Error handling with retry option
 * - City match display with explanation
 * - Accept/Refuse actions
 * - Map background showing the matched city
 */
function ResultsPage({ answers, onAccept, onRefuse }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cityMatch, setCityMatch] = useState(null);

  const fetchCityRecommendation = async () => {
    setLoading(true);
    setError(null);

    try {
      console.log('🚀 Calling /api/gemini with answers:', answers);
      
      // Call Vercel serverless function
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers }),
      });

      console.log('📡 Response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        console.error('❌ API Error:', errorData);
        throw new Error(errorData.error || `API request failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ Success! City match:', data);
      setCityMatch(data);
    } catch (err) {
      console.error('💥 Error fetching city recommendation:', err);
      setError(err.message || 'An unexpected error occurred. Please check the console for details.');
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
    <div className="relative min-h-screen flex items-center justify-center py-8 overflow-hidden">
      {/* Map Background */}
      <MapBackground city={cityMatch.city} className="absolute inset-0 z-0" />
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2" style={{ textShadow: '0 4px 12px rgba(0, 0, 0, 0.5), 0 2px 4px rgba(0, 0, 0, 0.3)' }}>
            Your Perfect Match!
          </h1>
          <p className="text-white text-lg" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)' }}>
            Based on your preferences, we found your ideal city
          </p>
        </div>

        {/* Glowing Victory Card */}
        <div 
          className="bg-zillow-blue rounded-3xl shadow-2xl p-8 md:p-10 relative overflow-hidden"
          style={{
            animation: 'float 3s ease-in-out infinite, glow 2s ease-in-out infinite',
            boxShadow: '0 0 60px rgba(0, 116, 228, 0.6), 0 20px 40px rgba(0, 0, 0, 0.3), inset 0 -2px 10px rgba(255, 255, 255, 0.2)'
          }}
        >
          {/* Shimmer effect overlay */}
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
              animation: 'shimmer 3s infinite'
            }}
          />
          
          {/* City Badge */}
          <div className="text-center mb-6 relative z-10">
            <div className="text-7xl mb-4 animate-bounce">🏙️</div>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-2">
              {cityMatch.city}
            </h2>
            <p className="text-2xl text-white/90">{cityMatch.country}</p>
          </div>

          {/* Explanation */}
          <div className="mb-8 p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 relative z-10">
            <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wide mb-3">
              Why This City?
            </h3>
            <p className="text-white text-lg leading-relaxed">
              {cityMatch.explanation}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4 relative z-10">
            <button
              onClick={onAccept}
              className="w-full bg-white text-zillow-blue py-4 px-6 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl hover:scale-105 transform"
            >
              ✓ Love It! Let&apos;s Find a Neighborhood
            </button>
            <button
              onClick={onRefuse}
              className="w-full bg-white/20 backdrop-blur-sm text-white border-2 border-white/40 py-3 px-6 rounded-xl font-semibold hover:bg-white/30 transition-all"
            >
              Not Quite Right - Try Again
            </button>
          </div>
        </div>

        {/* Fun fact or encouragement */}
        <div className="text-center mt-6 text-sm text-white" style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)' }}>
          <p>💡 Tip: Each answer shapes your perfect match!</p>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-10px) rotate(0.5deg);
          }
          50% {
            transform: translateY(-5px) rotate(-0.5deg);
          }
          75% {
            transform: translateY(-15px) rotate(0.3deg);
          }
        }
        
        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 60px rgba(0, 116, 228, 0.6), 0 20px 40px rgba(0, 0, 0, 0.3), inset 0 -2px 10px rgba(255, 255, 255, 0.2);
          }
          50% {
            box-shadow: 0 0 80px rgba(0, 116, 228, 0.8), 0 20px 50px rgba(0, 0, 0, 0.4), inset 0 -2px 15px rgba(255, 255, 255, 0.3);
          }
        }
        
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
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
