import { useState } from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line no-unused-vars
import { motion, useMotionValue, useTransform } from 'framer-motion';
import SwipeIndicators from './SwipeIndicators';

/**
 * SwipeCard Component
 * 
 * A swipeable card using Framer Motion for smooth drag interactions.
 * Features:
 * - Drag left/right for binary questions
 * - Rotation transform based on x position
 * - Opacity transform during drag
 * - Exit animations in swipe direction
 * - 100px swipe threshold
 */
function SwipeCard({ question, currentQuestion, totalQuestions, onAnswer }) {
  const { category, text, type, options } = question;
  const [exitX, setExitX] = useState(0);
  
  // Motion values for tracking drag position
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

  const handleDragEnd = (event, info) => {
    const threshold = 100;
    
    if (type === 'binary') {
      // Binary questions: Left = No, Right = Yes
      if (Math.abs(info.offset.x) > threshold) {
        if (info.offset.x > 0) {
          // Swiped right
          setExitX(1000);
          setTimeout(() => onAnswer(options.right), 200);
        } else {
          // Swiped left
          setExitX(-1000);
          setTimeout(() => onAnswer(options.left), 200);
        }
      }
    }
    // Note: For multiChoice, we'll keep the buttons for now (Phase 1)
    // 8-directional swipe detection would be added in a future enhancement
  };

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

      {/* Card Container with Swipe Indicators */}
      <div className="relative">
        {/* Swipe Indicators */}
        {type === 'binary' && <SwipeIndicators x={x} />}

        {/* Swipeable Question Card */}
        <motion.div
          className="bg-white rounded-2xl shadow-xl p-8 min-h-[400px] flex flex-col justify-between cursor-grab active:cursor-grabbing"
          style={{
            x,
            rotate,
            opacity
          }}
          drag={type === 'binary' ? 'x' : false}
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
          animate={exitX !== 0 ? { x: exitX } : {}}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
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
          {type === 'binary' ? (
            <>
              <p className="text-sm text-gray-500 mb-4 text-center">
                Swipe left or right • Or tap below
              </p>
              
              {/* Fallback Buttons for Accessibility */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => {
                    setExitX(-1000);
                    setTimeout(() => onAnswer(options.left), 200);
                  }}
                  className="text-center p-4 bg-gray-50 rounded-lg hover:bg-zillow-blue hover:text-white transition-all duration-200 active:scale-95 cursor-pointer border-2 border-transparent hover:border-zillow-blue"
                >
                  <div className="text-3xl mb-2">←</div>
                  <p className="text-sm font-medium">{options.left}</p>
                </button>
                <button
                  onClick={() => {
                    setExitX(1000);
                    setTimeout(() => onAnswer(options.right), 200);
                  }}
                  className="text-center p-4 bg-gray-50 rounded-lg hover:bg-zillow-blue hover:text-white transition-all duration-200 active:scale-95 cursor-pointer border-2 border-transparent hover:border-zillow-blue"
                >
                  <div className="text-3xl mb-2">→</div>
                  <p className="text-sm font-medium">{options.right}</p>
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="text-sm text-gray-500 mb-4 text-center">
                Pick your preference
              </p>
              
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
            </>
          )}
        </div>
      </motion.div>
      </div>
    </div>
  );
}

SwipeCard.propTypes = {
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

export default SwipeCard;
