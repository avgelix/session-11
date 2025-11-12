import { useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * LoadingScreen Component
 * 
 * Displays an animated loading screen between game phases
 * Shows a spinning globe emoji with "Analyzing your preferences..." text
 * Automatically transitions to results after 2 seconds
 */
function LoadingScreen({ onComplete }) {
  useEffect(() => {
    // Automatically transition after 2 seconds
    const timer = setTimeout(() => {
      onComplete();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        {/* Animated Globe Emoji */}
        <div className="text-8xl mb-6 animate-spin" style={{ animationDuration: '2s' }}>
          🌍
        </div>
        
        {/* Loading Text */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Analyzing your preferences...
        </h2>
        <p className="text-gray-600">
          Finding your perfect city match
        </p>
      </div>
    </div>
  );
}

LoadingScreen.propTypes = {
  onComplete: PropTypes.func.isRequired,
};

export default LoadingScreen;
