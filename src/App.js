import React from "react";
import { QuizProvider } from "./context/QuizContext";
import { Welcome } from "./components/Welcome";
import { Quiz } from "./components/Quiz";
import { Results } from "./components/Results";
import { useQuiz } from "./context/QuizContext";
import styled from "styled-components";
import { Header } from "./components/Header";

const AppContainer = styled.div`
  min-height: 100vh;
  background: #f3f3e9;
`;
const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
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
        <Header />
        <Container>
          <AppContent />
        </Container>
      </AppContainer>
    </QuizProvider>
  );
}

export default App;
