import React from 'react';
import { QuizProvider } from './context/QuizContext';
import { Welcome } from './components/Welcome';
import { Quiz } from './components/Quiz';
import { Results } from './components/Results';
import { useQuiz } from './context/QuizContext';
import styled from 'styled-components';

const AppContainer = styled.div`
  min-height: 100vh;
  background: #fff;
`;

function AppContent() {
  const { state } = useQuiz();

  if (!state.selectedCategory) {
    return <Welcome />; 
  }

  if (state.isQuizComplete) {
    return <Results />;
  }

  return <Quiz />;
}

function App() {
  return (
    <QuizProvider>
      <AppContainer>
        <AppContent />
      </AppContainer>
    </QuizProvider>
  );
}

export default App; 