import { useState, useEffect } from 'react';

const STORAGE_KEY = 'whereToMoveGameState';

/**
 * Load initial state from localStorage
 */
const loadInitialState = () => {
  try {
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (savedState) {
      return JSON.parse(savedState);
    }
  } catch (error) {
    console.error('Failed to load game state from localStorage:', error);
  }
  return {
    currentQuestionIndex: 0,
    answers: [],
    gamePhase: 'questions'
  };
};

/**
 * Custom hook for managing game state with localStorage persistence
 * 
 * Manages:
 * - currentQuestionIndex: Which question the user is on (0-19)
 * - answers: Array of user answers with question context
 * - gamePhase: Current phase ('questions' | 'loading' | 'results')
 * 
 * All state is automatically persisted to localStorage and restored on mount
 */
function useGameState() {
  // Use lazy initializer to load from localStorage immediately
  const initialState = loadInitialState();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(initialState.currentQuestionIndex);
  const [answers, setAnswers] = useState(initialState.answers);
  const [gamePhase, setGamePhase] = useState(initialState.gamePhase);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    try {
      const stateToSave = {
        currentQuestionIndex,
        answers,
        gamePhase,
        timestamp: Date.now()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (error) {
      console.error('Failed to save game state to localStorage:', error);
      // Continue even if localStorage fails (privacy mode, quota exceeded, etc.)
    }
  }, [currentQuestionIndex, answers, gamePhase]);

  /**
   * Add an answer and move to next question or results
   */
  const addAnswer = (answer) => {
    const updatedAnswers = [...answers, answer];
    setAnswers(updatedAnswers);
    
    // Check if this was the last question (20 questions total)
    if (currentQuestionIndex === 19) {
      // Move to loading phase, then results
      setGamePhase('loading');
    } else {
      // Move to next question
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  /**
   * Restart the game - clears all state and localStorage
   */
  const restart = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setGamePhase('questions');
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear localStorage:', error);
    }
  };

  return {
    currentQuestionIndex,
    answers,
    gamePhase,
    setGamePhase,
    addAnswer,
    restart
  };
}

export default useGameState;
