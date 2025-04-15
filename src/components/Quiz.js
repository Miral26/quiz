import React, { useEffect } from 'react';
import { useQuiz } from '../context/QuizContext';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  background: #fff;
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  color: #000;
  span {
    color: #C2185B;
  }
`;

const ExitButton = styled.button`
  background: #FFF1F5;
  color: #C2185B;
  border: none;
  padding: 0.5rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    background: #FFE4EC;
  }
`;

const Progress = styled.div`
  margin-bottom: 2rem;
`;

const ProgressText = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  
  span {
    color: #C2185B;
    font-weight: bold;
  }
`;

const ProgressBar = styled.div`
  height: 4px;
  background: #F3E5F5;
  border-radius: 2px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: #C2185B;
  width: ${props => props.progress}%;
  transition: width 0.3s ease;
`;

const Timer = styled.div`
  font-size: 1rem;
  color: #666;
`;

const QuestionContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const QuestionNumber = styled.div`
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 1rem;
`;

const QuestionText = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 2rem;
  line-height: 1.4;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const OptionButton = styled.button`
  width: 100%;
  padding: 1.5rem;
  text-align: left;
  border: 2px solid ${props => props.selected ? '#C2185B' : '#ddd'};
  border-radius: 8px;
  background: ${props => props.selected ? '#FFF1F5' : '#fff'};
  cursor: pointer;
  font-size: 1rem;
  color: #333;
  transition: all 0.2s ease;

  &:hover {
    border-color: #C2185B;
    background: ${props => props.selected ? '#FFF1F5' : '#FFF9FB'};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
`;

const NextButton = styled.button`
  background: #C2185B;
  color: white;
  padding: 0.8rem 2rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background: #A01346;
  }

  &:disabled {
    background: #ddd;
    cursor: not-allowed;
  }
`;

const SkipButton = styled.button`
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  font-size: 1rem;
  text-decoration: underline;

  &:hover {
    color: #333;
  }
`;

export function Quiz() {
  const { state, answerQuestion, nextQuestion, resetQuiz } = useQuiz();
  const currentQuestion = state.selectedCategory?.questions[state.currentQuestionIndex];
  const [selectedAnswer, setSelectedAnswer] = React.useState(null);

  useEffect(() => {
    setSelectedAnswer(null);
  }, [state.currentQuestionIndex]);

  if (!currentQuestion) return null;

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    answerQuestion(answer);
  };

  const handleNext = () => {
    nextQuestion();
  };

  const progress = ((state.currentQuestionIndex + 1) / state.selectedCategory.questions.length) * 100;

  return (
    <Container>
      <Header>
        <Logo>
          QUIZ<span>Mania</span>
        </Logo>
        <ExitButton onClick={resetQuiz}>Exit Quiz</ExitButton>
      </Header>

      <Progress>
        <ProgressText>
          <span>{state.currentQuestionIndex + 1}/{state.selectedCategory.questions.length}</span>
          <Timer>{state.timer}:00</Timer>
        </ProgressText>
        <ProgressBar>
          <ProgressFill progress={progress} />
        </ProgressBar>
      </Progress>

      <QuestionContainer>
        <QuestionNumber>
          {state.currentQuestionIndex + 1}. {currentQuestion.question}
        </QuestionNumber>

        <OptionsContainer>
          {currentQuestion.options.map((option, index) => (
            <OptionButton
              key={index}
              onClick={() => handleAnswer(option)}
              selected={selectedAnswer === option}
              disabled={selectedAnswer !== null}
            >
              {option}
            </OptionButton>
          ))}
        </OptionsContainer>

        <ButtonContainer>
          <SkipButton onClick={handleNext}>
            Skip this question
          </SkipButton>
          <NextButton
            onClick={handleNext}
            disabled={!selectedAnswer && state.timer > 0}
          >
            Next
          </NextButton>
        </ButtonContainer>
      </QuestionContainer>
    </Container>
  );
} 