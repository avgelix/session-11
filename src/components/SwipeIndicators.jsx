import PropTypes from 'prop-types';
// eslint-disable-next-line no-unused-vars
import { motion, useTransform } from 'framer-motion';

/**
 * SwipeIndicators Component
 * 
 * Displays visual feedback during card drag:
 * - Left indicator (👎) appears when swiping left (No)
 * - Right indicator (👍) appears when swiping right (Yes)
 * - Opacity dynamically adjusts based on drag position
 */
function SwipeIndicators({ x }) {
  // Transform drag position into opacity values for indicators
  // Left indicator: Visible when x is negative (dragging left)
  const leftOpacity = useTransform(x, [-100, 0], [1, 0]);
  // Right indicator: Visible when x is positive (dragging right)
  const rightOpacity = useTransform(x, [0, 100], [0, 1]);

  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      {/* Left Indicator - "No" */}
      <motion.div
        className="absolute left-8 top-1/2 -translate-y-1/2"
        style={{ opacity: leftOpacity }}
      >
        <div className="bg-red-500/80 backdrop-blur-sm text-white rounded-full px-6 py-3 shadow-lg">
          <span className="text-2xl font-bold">←</span>
        </div>
      </motion.div>

      {/* Right Indicator - "Yes" */}
      <motion.div
        className="absolute right-8 top-1/2 -translate-y-1/2"
        style={{ opacity: rightOpacity }}
      >
        <div className="bg-green-500/80 backdrop-blur-sm text-white rounded-full px-6 py-3 shadow-lg">
          <span className="text-2xl font-bold">→</span>
        </div>
      </motion.div>
    </div>
  );
}

SwipeIndicators.propTypes = {
  x: PropTypes.object.isRequired, // MotionValue from Framer Motion
};

export default SwipeIndicators;
