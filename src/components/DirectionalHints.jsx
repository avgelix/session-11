import PropTypes from 'prop-types';
// eslint-disable-next-line no-unused-vars
import { motion, useTransform } from 'framer-motion';
import { getSwipeDirection, getDistance } from '../utils/swipeDetection';

/**
 * DirectionalHints Component
 * 
 * Displays visual hints for 8-directional swipes around the card
 * Shows dynamic feedback based on current drag position
 * Highlights the direction being targeted during drag
 */
function DirectionalHints({ x, y, options }) {
  // Create opacity transforms for each direction at component level
  // Each indicator becomes more opaque when being targeted
  const upOpacity = useTransform([x, y], ([xVal, yVal]) => {
    const distance = getDistance(xVal, yVal);
    if (distance < 30) return 0.3;
    const dir = getSwipeDirection(xVal, yVal);
    return dir === 'up' ? Math.min(distance / 100, 1) : 0.3;
  });

  const upRightOpacity = useTransform([x, y], ([xVal, yVal]) => {
    const distance = getDistance(xVal, yVal);
    if (distance < 30) return 0.3;
    const dir = getSwipeDirection(xVal, yVal);
    return dir === 'upRight' ? Math.min(distance / 100, 1) : 0.3;
  });

  const rightOpacity = useTransform([x, y], ([xVal, yVal]) => {
    const distance = getDistance(xVal, yVal);
    if (distance < 30) return 0.3;
    const dir = getSwipeDirection(xVal, yVal);
    return dir === 'right' ? Math.min(distance / 100, 1) : 0.3;
  });

  const downRightOpacity = useTransform([x, y], ([xVal, yVal]) => {
    const distance = getDistance(xVal, yVal);
    if (distance < 30) return 0.3;
    const dir = getSwipeDirection(xVal, yVal);
    return dir === 'downRight' ? Math.min(distance / 100, 1) : 0.3;
  });

  const downOpacity = useTransform([x, y], ([xVal, yVal]) => {
    const distance = getDistance(xVal, yVal);
    if (distance < 30) return 0.3;
    const dir = getSwipeDirection(xVal, yVal);
    return dir === 'down' ? Math.min(distance / 100, 1) : 0.3;
  });

  const downLeftOpacity = useTransform([x, y], ([xVal, yVal]) => {
    const distance = getDistance(xVal, yVal);
    if (distance < 30) return 0.3;
    const dir = getSwipeDirection(xVal, yVal);
    return dir === 'downLeft' ? Math.min(distance / 100, 1) : 0.3;
  });

  const leftOpacity = useTransform([x, y], ([xVal, yVal]) => {
    const distance = getDistance(xVal, yVal);
    if (distance < 30) return 0.3;
    const dir = getSwipeDirection(xVal, yVal);
    return dir === 'left' ? Math.min(distance / 100, 1) : 0.3;
  });

  const upLeftOpacity = useTransform([x, y], ([xVal, yVal]) => {
    const distance = getDistance(xVal, yVal);
    if (distance < 30) return 0.3;
    const dir = getSwipeDirection(xVal, yVal);
    return dir === 'upLeft' ? Math.min(distance / 100, 1) : 0.3;
  });

  const opacities = {
    up: upOpacity,
    upRight: upRightOpacity,
    right: rightOpacity,
    downRight: downRightOpacity,
    down: downOpacity,
    downLeft: downLeftOpacity,
    left: leftOpacity,
    upLeft: upLeftOpacity
  };

  // Direction hint configuration with positions and arrows
  const hints = [
    { key: 'up', label: options.up, arrow: '↑', position: 'top-0 left-1/2 -translate-x-1/2 -translate-y-full pt-2' },
    { key: 'upRight', label: options.upRight, arrow: '↗', position: 'top-0 right-0 -translate-y-full translate-x-full pt-2 pr-2' },
    { key: 'right', label: options.right, arrow: '→', position: 'top-1/2 right-0 translate-x-full -translate-y-1/2 pr-2' },
    { key: 'downRight', label: options.downRight, arrow: '↘', position: 'bottom-0 right-0 translate-y-full translate-x-full pb-2 pr-2' },
    { key: 'down', label: options.down, arrow: '↓', position: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-full pb-2' },
    { key: 'downLeft', label: options.downLeft, arrow: '↙', position: 'bottom-0 left-0 translate-y-full -translate-x-full pb-2 pl-2' },
    { key: 'left', label: options.left, arrow: '←', position: 'top-1/2 left-0 -translate-x-full -translate-y-1/2 pl-2' },
    { key: 'upLeft', label: options.upLeft, arrow: '↖', position: 'top-0 left-0 -translate-y-full -translate-x-full pt-2 pl-2' }
  ];

  return (
    <div className="absolute inset-0 pointer-events-none">
      {hints.map(({ key, label, arrow, position }) => (
        <motion.div
          key={key}
          className={`absolute ${position} flex flex-col items-center max-w-[120px]`}
          style={{ opacity: opacities[key] }}
        >
          <div className="bg-zillow-blue text-white rounded-lg px-3 py-2 shadow-lg">
            <div className="text-2xl text-center mb-1">{arrow}</div>
            <p className="text-xs font-medium text-center leading-tight">{label}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

DirectionalHints.propTypes = {
  x: PropTypes.object.isRequired, // MotionValue from Framer Motion
  y: PropTypes.object.isRequired, // MotionValue from Framer Motion
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
};

export default DirectionalHints;
