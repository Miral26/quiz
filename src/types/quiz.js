// Quiz data structure definitions
export const Question = {
  id: '',
  question: '',
  options: [],
  correctAnswer: '',
  timeLimit: 0
};

export const Category = {
  id: '',
  name: '',
  questions: []
};

export const QuizState = {
  categories: [],
  selectedCategory: null,
  currentQuestionIndex: 0,
  score: 0,
  unansweredQuestions: 0,
  timer: 10,
  isQuizComplete: false
};

export const QuizContextType = {
  state: QuizState,
  selectCategory: (category) => {},
  answerQuestion: (answer) => {},
  nextQuestion: () => {},
  resetQuiz: () => {}
}; 