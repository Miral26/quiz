import React from 'react';
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
  margin-bottom: 4rem;
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  color: #000;
  span {
    color: #C2185B;
  }
`;

const UserName = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const UserAvatar = styled.div`
  width: 32px;
  height: 32px;
  background: #C2185B;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
`;

const UserText = styled.span`
  color: #333;
`;

const ResultsContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
`;

const ResultIcon = styled.div`
  width: 64px;
  height: 64px;
  margin: 0 auto 1rem;
  background: ${props => props.success ? '#E8F5E9' : '#FFF1F5'};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.success ? '#4CAF50' : '#C2185B'};
  font-size: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 0.5rem;
  letter-spacing: 4px;
  text-transform: uppercase;
`;

const Subtitle = styled.p`
  color: #666;
  margin-bottom: 2rem;
`;

const ScoreCircle = styled.div`
  width: 150px;
  height: 150px;
  border: 2px solid ${props => props.score >= 60 ? '#4CAF50' : '#C2185B'};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem;
`;

const Score = styled.div`
  font-size: 3rem;
  color: ${props => props.score >= 60 ? '#4CAF50' : '#C2185B'};
  font-weight: bold;
`;

const Message = styled.h2`
  font-size: 2rem;
  color: #333;
  margin-bottom: 2rem;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const Stats = styled.div`
  background: #F9F9F9;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  display: inline-flex;
  gap: 2rem;
`;

const StatItem = styled.div`
  text-align: center;
  
  span {
    display: block;
    &:first-child {
      font-size: 1.2rem;
      color: ${props => props.color};
      font-weight: bold;
      margin-bottom: 0.25rem;
    }
    &:last-child {
      color: #666;
      font-size: 0.9rem;
    }
  }
`;

const RetakeButton = styled.button`
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
`;

export function Results() {
  const { state, resetQuiz } = useQuiz();
  const totalQuestions = state.selectedCategory?.questions.length || 0;
  const percentage = (state.score / totalQuestions) * 100;
  const isSuccess = percentage >= 60;

  return (
    <Container>
      <Header>
        <Logo>
          QUIZ<span>Mania</span>
        </Logo>
        <UserName>
          <UserAvatar>R</UserAvatar>
          <UserText>Richard Joe Freds</UserText>
        </UserName>
      </Header>

      <ResultsContainer>
        <ResultIcon success={isSuccess}>
          {isSuccess ? '✓' : '!'}
        </ResultIcon>
        
        <Title>
          {isSuccess ? 'Congratulation' : 'Keep Practicing!'}
        </Title>
        
        <Subtitle>
          You successfully completed the Quiz{isSuccess ? ' and holds' : ' but you need to'}
        </Subtitle>

        <ScoreCircle score={percentage}>
          <Score score={percentage}>{percentage.toFixed(0)}%</Score>
        </ScoreCircle>

        <Message>
          {percentage >= 80 ? 'Great job!' :
           percentage >= 60 ? 'Well done!' :
           'Keep practicing!'}
        </Message>

        <Stats>
          <StatItem color="#4CAF50">
            <span>{state.score}</span>
            <span>Correct</span>
          </StatItem>
          <StatItem color="#F44336">
            <span>{totalQuestions - state.score - state.unansweredQuestions}</span>
            <span>Incorrect</span>
          </StatItem>
          <StatItem color="#FF9800">
            <span>{state.unansweredQuestions}</span>
            <span>Not answered</span>
          </StatItem>
        </Stats>

        <RetakeButton onClick={resetQuiz}>
          Retake Quiz
        </RetakeButton>
      </ResultsContainer>
    </Container>
  );
} 