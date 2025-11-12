/**
 * Haptic Feedback Utility
 * 
 * Provides haptic feedback on supported devices (iOS Safari, Android Chrome)
 * Falls back gracefully on unsupported platforms
 */

/**
 * Trigger haptic feedback if available
 * @param {string} type - Type of haptic feedback: 'light', 'medium', 'heavy', 'success', 'warning', 'error'
 */
export const triggerHaptic = (type = 'light') => {
  // Check if Vibration API is supported
  if (!('vibrate' in navigator)) {
    return;
  }

  // Map haptic types to vibration patterns
  const patterns = {
    light: 10,
    medium: 20,
    heavy: 30,
    success: [10, 50, 10],
    warning: [20, 50, 20],
    error: [30, 50, 30, 50, 30]
  };

  const pattern = patterns[type] || patterns.light;
  
  try {
    navigator.vibrate(pattern);
  } catch (error) {
    // Silently fail if vibration is not supported or blocked
    console.debug('Haptic feedback not supported:', error);
  }
};

/**
 * Check if haptic feedback is available
 * @returns {boolean}
 */
export const isHapticSupported = () => {
  return 'vibrate' in navigator;
};
