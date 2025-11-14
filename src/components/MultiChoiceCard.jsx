import { useState } from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line no-unused-vars
import { motion, useMotionValue, useTransform } from 'framer-motion';
import DirectionalHints from './DirectionalHints';
import { getSwipeDirection, isValidSwipe } from '../utils/swipeDetection';
import { triggerHaptic } from '../utils/haptics';

/**
 * MultiChoiceCard Component
 * 
 * A card that supports 8-directional swipes for multi-choice questions
 * Features:
 * - 2D drag (both x and y axes)
 * - Dynamic directional hints around the card
 * - Distance threshold for valid swipes
 * - Direction detection using angle calculation
 * - Exit animations in the swiped direction
 */
function MultiChoiceCard({ question, currentQuestion, totalQuestions, onAnswer }) {
  const { category, text, options } = question;
  const [exitDirection, setExitDirection] = useState(null);
  
  // Motion values for 2D drag tracking
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Transform for card rotation based on x position
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  
  // Transform for card opacity based on distance from center
  const opacity = useTransform(
    [x, y],
    ([xVal, yVal]) => {
      const distance = Math.sqrt(xVal * xVal + yVal * yVal);
      return Math.max(1 - distance / 400, 0.3);
    }
  );

  /**
   * Handle drag end - detect direction and trigger answer
   */
  const handleDragEnd = (event, info) => {
    const { offset } = info;
    
    // Check if swipe meets minimum threshold (100px)
    if (!isValidSwipe(offset.x, offset.y, 100)) {
      // Snap back if swipe too short
      return;
    }
    
    // Get the direction of the swipe
    const direction = getSwipeDirection(offset.x, offset.y);
    
    // Trigger haptic feedback
    triggerHaptic('medium');
    
    // Calculate exit position (move card far in swipe direction)
    const exitMultiplier = 1500;
    const angle = Math.atan2(offset.y, offset.x);
    const exitX = Math.cos(angle) * exitMultiplier;
    const exitY = Math.sin(angle) * exitMultiplier;
    
    setExitDirection({ x: exitX, y: exitY });
    
    // Delay answer callback to allow exit animation
    setTimeout(() => {
      onAnswer(options[direction]);
    }, 200);
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

      {/* Card Container with Directional Hints */}
      <div className="relative min-h-[550px] flex items-center justify-center py-8">
        {/* Directional Hints */}
        <DirectionalHints x={x} y={y} options={options} />

        {/* Swipeable Card */}
        <motion.div
          className="bg-white rounded-2xl shadow-xl p-8 min-h-[350px] max-w-sm w-full flex flex-col justify-between cursor-grab active:cursor-grabbing"
          style={{
            x,
            y,
            rotate,
            opacity
          }}
          drag
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          dragElastic={0.7}
          onDragEnd={handleDragEnd}
          animate={exitDirection ? { x: exitDirection.x, y: exitDirection.y, opacity: 0 } : {}}
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

          {/* Instruction Text */}
          <div className="mt-6 border-t border-gray-200 pt-4">
            <p className="text-sm text-gray-500 text-center">
              Swipe in any direction to choose
            </p>
            <div className="mt-2 flex justify-center gap-2 text-xl opacity-50">
              <span>↖</span>
              <span>↑</span>
              <span>↗</span>
              <span>→</span>
              <span>↘</span>
              <span>↓</span>
              <span>↙</span>
              <span>←</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

MultiChoiceCard.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['multiChoice']).isRequired,
    options: PropTypes.shape({
      up: PropTypes.string.isRequired,
      upRight: PropTypes.string.isRequired,
      right: PropTypes.string.isRequired,
      downRight: PropTypes.string.isRequired,
      down: PropTypes.string.isRequired,
      downLeft: PropTypes.string.isRequired,
      left: PropTypes.string.isRequired,
      upLeft: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  currentQuestion: PropTypes.number.isRequired,
  totalQuestions: PropTypes.number.isRequired,
  onAnswer: PropTypes.func.isRequired
};

export default MultiChoiceCard;
