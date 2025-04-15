# Quiz Application

A modern, interactive quiz application built with React and TypeScript. Users can select from different categories, answer multiple-choice questions with a timer, and receive immediate feedback on their performance.

## Features

- Category selection
- Multiple-choice questions with 10-second timer
- Automatic progression to next question when time runs out
- Score calculation and performance feedback
- Responsive design for all screen sizes
- Clean and modern UI

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd quiz
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`.

## Project Structure

- `src/components/` - React components
  - `CategorySelection.tsx` - Category selection screen
  - `Quiz.tsx` - Quiz questions and timer
  - `Results.tsx` - Score display and feedback
- `src/context/` - React context for state management
  - `QuizContext.tsx` - Quiz state and logic
- `src/types/` - TypeScript type definitions
  - `quiz.ts` - Quiz-related interfaces

## Technologies Used

- React
- TypeScript
- Styled Components
- React Context API

## Completed Features

- [x] Category selection page
- [x] Quiz questions with timer
- [x] Multiple-choice options
- [x] Score calculation
- [x] Performance feedback
- [x] Responsive design
- [x] Clean code structure
- [x] Type safety with TypeScript

## Future Improvements

- Add more quiz categories
- Implement user authentication
- Add progress tracking
- Include difficulty levels
- Add animations and transitions
