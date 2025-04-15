import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { QuizState } from '../types/quiz';

const initialState = {
  categories: [
    {
      id: 'js_basics',
      name: 'JavaScript Basics',
      questions: [
        {
          id: 'q1',
          question: 'What is the correct syntax for referring to an external script called "script.js"?',
          options: [
            'A. <script name="script.js">',
            'B. <script href="script.js">',
            'C. <script src="script.js">',
            'D. <script file="script.js">'
          ],
          correctAnswer: 'C',
          timeLimit: 10
        },
        {
          id: 'q2',
          question: 'Which company developed JavaScript?',
          options: [
            'A. Microsoft',
            'B. Netscape',
            'C. Google',
            'D. Mozilla'
          ],
          correctAnswer: 'B',
          timeLimit: 10
        }
      ]
    }
  ],
  selectedCategory: null,
  currentQuestionIndex: 0,
  score: 0,
  unansweredQuestions: 0,
  timer: 10,
  isQuizComplete: false
};

function quizReducer(state, action) {
  switch (action.type) {
    case 'SELECT_CATEGORY':
      return {
        ...state,
        selectedCategory: action.payload,
        currentQuestionIndex: 0,
        score: 0,
        unansweredQuestions: 0,
        timer: action.payload.questions[0].timeLimit,
        isQuizComplete: false
      };
    case 'ANSWER_QUESTION':
      const currentQuestion = state.selectedCategory?.questions[state.currentQuestionIndex];
      const isCorrect = currentQuestion?.correctAnswer === action.payload;
      
      return {
        ...state,
        score: isCorrect ? state.score + 1 : state.score,
        unansweredQuestions: state.unansweredQuestions + (action.payload ? 0 : 1)
      };
    case 'NEXT_QUESTION':
      const nextIndex = state.currentQuestionIndex + 1;
      const isComplete = !state.selectedCategory?.questions[nextIndex];
      
      return {
        ...state,
        currentQuestionIndex: nextIndex,
        timer: state.selectedCategory?.questions[nextIndex]?.timeLimit || 10,
        isQuizComplete: isComplete
      };
    case 'RESET_QUIZ':
      return initialState;
    case 'UPDATE_TIMER':
      if (state.timer > 0) {
        return { ...state, timer: state.timer - 1 };
      } else {
        return { ...state, unansweredQuestions: state.unansweredQuestions + 1 };
      }
    default:
      return state;
  }
}

const QuizContext = createContext(undefined);

export function QuizProvider({ children }) {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  useEffect(() => {
    let timerId;
    if (state.selectedCategory && !state.isQuizComplete) {
      timerId = setInterval(() => {
        dispatch({ type: 'UPDATE_TIMER' });
      }, 1000);
    }
    return () => clearInterval(timerId);
  }, [state.selectedCategory, state.isQuizComplete]);

  const value = {
    state,
    selectCategory: (category) => dispatch({ type: 'SELECT_CATEGORY', payload: category }),
    answerQuestion: (answer) => dispatch({ type: 'ANSWER_QUESTION', payload: answer }),
    nextQuestion: () => dispatch({ type: 'NEXT_QUESTION' }),
    resetQuiz: () => dispatch({ type: 'RESET_QUIZ' })
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
} 