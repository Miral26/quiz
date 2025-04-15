import React, { createContext, useContext, useReducer, useEffect } from "react";
import { QuizState } from "../types/quiz";

const initialState = {
  categories: [
    {
      id: "js_basics",
      name: "JavaScript Basics",
      questions: [
        {
          id: "q1",
          question:
            "What is the correct syntax to print a message to the console in JavaScript?",
          options: [
            "A. echo('Hello, World!');",
            "B. print('Hello, World!');",
            "C. console.log('Hello, World!');",
            "D. System.out.println('Hello, World!');",
          ],
          correctAnswer: "C",
          timeLimit: 10,
        },
        {
          id: "q2",
          question:
            "Which of the following is a valid variable declaration in JavaScript?",
          options: [
            "A. var x = 5;",
            "B. variable x = 5;",
            "C. let x == 5;",
            "D. const x : 5;",
          ],
          correctAnswer: "A",
          timeLimit: 10,
        },
        {
          id: "q3",
          question:
            "Which of the following methods is used to add a new element to the end of an array in JavaScript?",
          options: [
            "A. array.add(element);",
            "B. array.push(element);",
            "C. array.insert(element);",
            "D. array.append(element);",
          ],
          correctAnswer: "B",
          timeLimit: 10,
        },
        {
          id: "q4",
          question:
            "What will the following code output?\n`console.log(2 + '2');`",
          options: ["A. 4", "B. 22", "C. NaN", "D. Error"],
          correctAnswer: "B",
          timeLimit: 10,
        },
        {
          id: "q5",
          question:
            "What is the result of the expression `typeof null` in JavaScript?",
          options: [
            "A. 'null'",
            "B. 'object'",
            "C. 'undefined'",
            "D. 'boolean'",
          ],
          correctAnswer: "B",
          timeLimit: 10,
        },
      ],
    },
    {
      id: "angular_basics",
      name: "Angular Basics",
      questions: [
        {
          id: "q1",
          question:
            "What is the purpose of Angular modules, and how do they help organize an Angular application?",
          options: [
            "A. Modules are used to organize components, services, and other code into cohesive blocks.",
            "B. Modules are only used for creating components.",
            "C. Modules are used for handling routing in Angular.",
            "D. Modules have no significant purpose in Angular.",
          ],
          correctAnswer: "A",
          timeLimit: 15,
        },
        {
          id: "q2",
          question:
            "What are the different types of directives in Angular? Can you explain the difference between structural and attribute directives?",
          options: [
            "A. Structural directives manipulate the DOM elements, while attribute directives change the behavior of elements.",
            "B. Structural directives are only used for routing.",
            "C. Attribute directives are used to fetch data.",
            "D. There is no difference between structural and attribute directives.",
          ],
          correctAnswer: "A",
          timeLimit: 15,
        },
        {
          id: "q3",
          question:
            "How does data binding work in Angular? Explain the difference between one-way and two-way data binding.",
          options: [
            "A. One-way binding transfers data from component to view, while two-way binding allows data transfer both ways.",
            "B. One-way binding is for routing, and two-way binding is for event handling.",
            "C. Data binding is only possible with one-way binding.",
            "D. There is no concept of two-way data binding in Angular.",
          ],
          correctAnswer: "A",
          timeLimit: 15,
        },
      ],
    },
    {
      id: "reactjs_advanced",
      name: "React.js Advanced",
      questions: [
        {
          id: "q1",
          question:
            "How do React Hooks work, and what is the difference between useState and useReducer?",
          options: [
            "A. useState is for handling simple state, while useReducer is for managing more complex state logic.",
            "B. useState and useReducer are the same and serve no purpose.",
            "C. useState handles async data, while useReducer handles sync data.",
            "D. useState is for event handling, and useReducer is for DOM updates.",
          ],
          correctAnswer: "A",
          timeLimit: 15,
        },
        {
          id: "q2",
          question:
            "Explain the concept of 'context' in React. How can you use React.createContext() and useContext() to manage state across components?",
          options: [
            "A. Context allows you to share data across the component tree without having to pass props manually.",
            "B. Context is only used for routing in React.",
            "C. Context is a third-party library for managing state.",
            "D. Context cannot be used with functional components.",
          ],
          correctAnswer: "A",
          timeLimit: 15,
        },
        {
          id: "q3",
          question:
            "What is React.memo, and how does it optimize performance in a functional component?",
          options: [
            "A. React.memo is a higher-order component that prevents unnecessary re-renders of functional components.",
            "B. React.memo optimizes performance for class components only.",
            "C. React.memo is a built-in hook for managing state.",
            "D. React.memo has no impact on performance.",
          ],
          correctAnswer: "A",
          timeLimit: 15,
        },
        {
          id: "q4",
          question:
            "What is the significance of the key prop in React lists, and why is it important for performance?",
          options: [
            "A. The key prop helps React identify which items in the list are changed, added, or removed.",
            "B. The key prop is not important for performance.",
            "C. The key prop is only used for event handling.",
            "D. The key prop helps in managing state in React.",
          ],
          correctAnswer: "A",
          timeLimit: 15,
        },
        {
          id: "q5",
          question:
            "Explain React's reconciliation process. How does the virtual DOM work to optimize updates?",
          options: [
            "A. React compares the virtual DOM with the real DOM to minimize direct updates, which improves performance.",
            "B. The virtual DOM has no effect on performance in React.",
            "C. Reconciliation is only used for styling.",
            "D. React updates the DOM directly without using the virtual DOM.",
          ],
          correctAnswer: "A",
          timeLimit: 15,
        },
      ],
    },
    {
      id: "flutter",
      name: "Flutter",
      questions: [
        {
          id: "q1",
          question:
            "What is a StatefulWidget in Flutter, and how does it differ from a StatelessWidget?",
          options: [
            "A. A StatefulWidget can rebuild its state, while a StatelessWidget cannot.",
            "B. A StatefulWidget is only used for animations.",
            "C. A StatelessWidget is used for state management.",
            "D. There is no difference between StatefulWidget and StatelessWidget.",
          ],
          correctAnswer: "A",
          timeLimit: 15,
        },
        {
          id: "q2",
          question:
            "How does Flutter handle layout and rendering? Explain the role of the Widget tree and RenderObject tree.",
          options: [
            "A. The Widget tree describes the UI, and the RenderObject tree defines how the UI is rendered.",
            "B. The Widget tree handles routing, while the RenderObject tree is for UI state.",
            "C. Flutter does not use Widget trees for layout rendering.",
            "D. The Widget tree is used for animations, and the RenderObject tree is for event handling.",
          ],
          correctAnswer: "A",
          timeLimit: 15,
        },
        {
          id: "q3",
          question:
            "What is the purpose of FutureBuilder and StreamBuilder in Flutter? Provide an example use case for each.",
          options: [
            "A. FutureBuilder is used to handle asynchronous operations that return a Future, while StreamBuilder is used for streams.",
            "B. FutureBuilder handles events, and StreamBuilder handles UI updates.",
            "C. FutureBuilder is used for state management, and StreamBuilder is used for animations.",
            "D. FutureBuilder and StreamBuilder are not needed in Flutter.",
          ],
          correctAnswer: "A",
          timeLimit: 15,
        },
        {
          id: "q4",
          question:
            "What is the difference between hot reload and hot restart in Flutter?",
          options: [
            "A. Hot reload preserves the app's state, while hot restart completely restarts the app.",
            "B. Hot reload does not work with state changes, while hot restart preserves state.",
            "C. Hot reload is used only for testing, and hot restart is used for production.",
            "D. There is no difference between hot reload and hot restart.",
          ],
          correctAnswer: "A",
          timeLimit: 15,
        },
        {
          id: "q5",
          question:
            "Explain how Flutter manages navigation between screens using Navigator and routes. What is the difference between push and pushReplacement?",
          options: [
            "A. `push` adds a new screen to the navigation stack, while `pushReplacement` replaces the current screen with a new one.",
            "B. `push` replaces a screen, and `pushReplacement` adds a screen to the stack.",
            "C. `push` is used only for routing, and `pushReplacement` is used for data handling.",
            "D. There is no difference between `push` and `pushReplacement`.",
          ],
          correctAnswer: "A",
          timeLimit: 15,
        },
      ],
    },
  ],

  selectedCategory: null,
  currentQuestionIndex: 0,
  score: 0,
  unansweredQuestions: 0,
  timer: 10,
  isQuizComplete: false,
};

function quizReducer(state, action) {
  switch (action.type) {
    case "SELECT_CATEGORY":
      return {
        ...state,
        selectedCategory: action.payload,
        currentQuestionIndex: 0,
        score: 0,
        unansweredQuestions: 0,
        timer: action.payload.questions[0].timeLimit,
        isQuizComplete: false,
      };
    case "ANSWER_QUESTION":
      const currentQuestion =
        state.selectedCategory?.questions[state.currentQuestionIndex];
      const isCorrect = currentQuestion?.correctAnswer === action.payload;

      return {
        ...state,
        score: isCorrect ? state.score + 1 : state.score,
        unansweredQuestions:
          state.unansweredQuestions + (action.payload ? 0 : 1),
      };
    case "NEXT_QUESTION":
      const nextIndex = state.currentQuestionIndex + 1;
      const isComplete = !state.selectedCategory?.questions[nextIndex];

      return {
        ...state,
        currentQuestionIndex: nextIndex,
        timer: state.selectedCategory?.questions[nextIndex]?.timeLimit || 10,
        isQuizComplete: isComplete,
      };
    case "RESET_QUIZ":
      return initialState;
    case "UPDATE_TIMER":
      if (state.timer > 0) {
        return { ...state, timer: state.timer - 1 };
      } else {
        const nextIndex = state.currentQuestionIndex + 1;
        const isComplete = !state.selectedCategory?.questions[nextIndex];

        return {
          ...state,
          unansweredQuestions: state.unansweredQuestions + 1,
          currentQuestionIndex: nextIndex,
          timer: state.selectedCategory?.questions[nextIndex]?.timeLimit || 10,
          isQuizComplete: isComplete,
        };
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
        dispatch({ type: "UPDATE_TIMER" });
      }, 1000);
    }
    return () => clearInterval(timerId);
  }, [state.selectedCategory, state.isQuizComplete]);

  const value = {
    state,
    selectCategory: (category) =>
      dispatch({ type: "SELECT_CATEGORY", payload: category }),
    answerQuestion: (answer) =>
      dispatch({ type: "ANSWER_QUESTION", payload: answer }),
    nextQuestion: () => dispatch({ type: "NEXT_QUESTION" }),
    resetQuiz: () => dispatch({ type: "RESET_QUIZ" }),
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
}
