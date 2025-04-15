import React from 'react';
import { useQuiz } from '../context/QuizContext';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #333;
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  width: 100%;
  max-width: 1200px;
`;

const CategoryCard = styled.button`
  background: white;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-color: #4a90e2;
  }
  
  h2 {
    margin: 0;
    color: #333;
    font-size: 1.5rem;
  }
`;

export function CategorySelection() {
  const { state, selectCategory } = useQuiz();

  return (
    <Container>
      <Title>Select a Quiz Category</Title>
      <CategoryGrid>
        {state.categories.map((category) => (
          <CategoryCard
            key={category.id}
            onClick={() => selectCategory(category)}
          >
            <h2>{category.name}</h2>
          </CategoryCard>
        ))}
      </CategoryGrid>
    </Container>
  );
} 