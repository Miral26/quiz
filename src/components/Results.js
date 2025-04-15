import React from "react";
import { useQuiz } from "../context/QuizContext";
import styled from "styled-components";
import KeepoSvg from "../lib/svg/KeepSvg";
import SuccessSvg from "../lib/svg/SuccessSvg ";

const ResultsContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
`;

const ResultIcon = styled.div`
  width: 96px;
  height: 96px;
  margin: 0 auto 1rem;
  background: ${(props) => (props.success ? "#E8F5E9" : "#FFF1F5")};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => (props.success ? "#4CAF50" : "#C2185B")};
  font-size: 2rem;
`;

const MessageText = styled.p`
  font-size: 1.2rem;
  color: #373052;
  margin-top: 1.5rem;
  font-weight: 500;
  text-align: center;
`;

const Title = styled.h1`
  max-width: 637px;
  font-size: 2.5rem;
  color: #373052;
  font-weight: 300;
  letter-spacing: 1rem;
  text-transform: uppercase;
  margin: 0 auto;
`;

const Subtitle = styled.p`
  color: #666;
  margin-bottom: 2rem;
`;

const ScoreCircle = styled.div`
  width: 219px;
  height: 219px;
  border: 2px solid ${(props) => (props.score >= 60 ? "#4CAF50" : "#D2829A")};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem;
  flex-direction: column;
`;

const ScoreSpan = styled.span`
  font-weight: 300;
  font-size: 1.875rem;
  color: #373052;
  margin-bottom: 0.5rem;
`;

const Score = styled.div`
  font-weight: 700;
  font-size: 3rem;
  color: ${(props) => (props.score >= 60 ? "#06AF52" : "#AF9B06")};
  font-weight: bold;
`;

const SuccessScore = styled.div`
  font-weight: 700;
  font-size: 3rem;
  color: #06af52;
`;

const SuccessSpan = styled.span`
  font-weight: 300;
  font-size: 1.875rem;
  color: #373052;
  margin-bottom: 0.5rem;
`;

const ScoreSucces = styled.div`
  font-weight: 700;
  font-size: 3rem;
  color: #06af52;
`;

const Message = styled.h2`
  font-weight: 500;
  font-size: 2.5rem;
  color: #373052;
  margin-top: 0.5rem;
  margin-bottom: 2rem;
`;

const Stats = styled.div`
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  display: inline-flex;
  gap: 1.5rem;
  flex-direction: column;
`;

const StatsTitle = styled.span`
  font-size: 1.5rem;
  font-weight: 500;
  color: #373052;
`;

const StatsBox = styled.div`
  display: flex;
  gap: 2rem;
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;

  span {
    display: block;
    &:first-child {
      font-size: 1.25rem;
      color: ${(props) => props.color};
      font-weight: bold;
      margin-bottom: 0.25rem;
    }
    &:last-child {
      color: #666;
      font-size: 01.25rem;
      padding-bottom: 0.25rem;
      font-weight: 400;
    }
  }
`;

const RetakeButton = styled.button`
  background: #f3f3e9;
  color: #c2185b;
  padding: 0.8rem 2rem;
  border: 1px solid #c2185b;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.25rem;
  font-family: "Outfit", sans-serif;
`;

export function Results() {
  const { state, resetQuiz } = useQuiz();
  const totalQuestions = state.selectedCategory?.questions.length || 0;
  const percentage = (state.score / totalQuestions) * 100;
  const isSuccess = percentage >= 60;

  return (
    <>
      <ResultsContainer>
        <ResultIcon success={isSuccess}>
          {isSuccess ? <SuccessSvg /> : <KeepoSvg />}
        </ResultIcon>

        <MessageText>
          {!isSuccess && "You successfully completed the Quiz but you need to"}
        </MessageText>

        <Title>{isSuccess ? "Congratulation" : "Keep Practicing!"}</Title>

        <Subtitle>
          {isSuccess && "You successfully completed the Quiz and holds"}
        </Subtitle>

        {isSuccess ? (
          <SuccessScore score={percentage}>
            <SuccessSpan>Your Score</SuccessSpan>
            <ScoreSucces score={percentage}>
              {percentage.toFixed(0)}%
            </ScoreSucces>
          </SuccessScore>
        ) : (
          <ScoreCircle score={percentage}>
            <ScoreSpan>Your Score</ScoreSpan>
            <Score score={percentage}>{percentage.toFixed(0)}%</Score>
          </ScoreCircle>
        )}

        <Message>{isSuccess && "Great job!"}</Message>

        <Stats>
          <StatsTitle>Out of {totalQuestions} question</StatsTitle>
          <StatsBox>
            <StatItem color="#4CAF50">
              <span>{state.score}</span>
              <span>Correct</span>
            </StatItem>
            <StatItem color="#F44336">
              <span>
                {totalQuestions - state.score - state.unansweredQuestions}
              </span>
              <span>Incorrect</span>
            </StatItem>
            <StatItem color="#FF9800">
              <span>{state.unansweredQuestions}</span>
              <span>Not answered</span>
            </StatItem>
          </StatsBox>
        </Stats>
      </ResultsContainer>
      <RetakeButton onClick={resetQuiz}>Retake Quiz</RetakeButton>
    </>
  );
}
