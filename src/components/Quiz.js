import React, { useEffect } from "react";
import { useQuiz } from "../context/QuizContext";
import styled from "styled-components";


const Progress = styled.div`
  margin-bottom: 2rem;
`;

const ProgressText = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;

  span {
    font-size: 2rem;
    color: #c2185b;
    font-weight: bold;

    &:last-child {
      font-size: 1.5rem;
      color: #000000;
      margin-left: 0.3rem;
    }
  }
`;

const ProgressBar = styled.div`
  height: 12px;
  background: #f3e5f5;
  border-radius: 2px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: #c2185b;
  width: ${(props) => props.progress}%;
  transition: width 0.3s ease;
`;

const Timer = styled.div`
  background: #E9E8E3;
  padding: 8px 16px;
  border-radius: 4px;
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

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const OptionButton = styled.button`
  width: 100%;
  padding: 1.5rem;
  text-align: left;
  border: 2px solid ${(props) => (props.selected ? "#C2185B" : "#ddd")};
  border-radius: 8px;
  background: ${(props) => (props.selected ? "#FFF1F5" : "#fff")};
  cursor: pointer;
  font-size: 1rem;
  color: #333;
  transition: all 0.2s ease;
  font-family: "Outfit", sans-serif;


  &:hover {
    border-color: #c2185b;
    background: ${(props) => (props.selected ? "#FFF1F5" : "#FFF9FB")};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 2rem;
  gap: 1rem;
`;

const NextButton = styled.button`
  background: #c2185b;
  color: white;
  padding: 8px 64px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 24px;
  font-family: "Outfit", sans-serif;


  &:hover {
    background: #a01346;
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
  text-decoration: none;
  font-family: "Outfit", sans-serif;


  &:hover {
    color: #333;
  }
`;

export function Quiz() {
  const { state, answerQuestion, nextQuestion, skipQuestion } = useQuiz();
  const currentQuestion =
    state.selectedCategory?.questions[state.currentQuestionIndex];
  const [selectedAnswer, setSelectedAnswer] = React.useState(null);

  useEffect(() => {
    setSelectedAnswer(null);
  }, [state.currentQuestionIndex]);

  if (!currentQuestion) return null;

  const handleAnswer = (answer) => {
    console.log("answer", answer);
    setSelectedAnswer(answer);
    answerQuestion(answer);
  };

  const handleNext = () => {
    nextQuestion();
  };

  const handleSkip = () => {
    skipQuestion();
  };

  const progress =
    ((state.currentQuestionIndex + 1) /
      state.selectedCategory.questions.length) *
    100;

  return (
    <>

      <Progress>
        <ProgressText>
          <div>
          <span>
            {state.currentQuestionIndex + 1}/
          </span>
          <span>
            {state.selectedCategory.questions.length}
            </span>
            </div>
          <Timer>00:{state.timer}</Timer>
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
          <NextButton
            onClick={handleNext}
            disabled={!selectedAnswer && state.timer > 0}
          >
            Next
          </NextButton>
          <SkipButton onClick={handleSkip}>Skip this question</SkipButton>
        </ButtonContainer>
      </QuestionContainer>
    </>
  );
}
