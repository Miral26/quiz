import React, { useState } from "react";
import { useQuiz } from "../context/QuizContext";
import styled from "styled-components";

const WelcomeText = styled.h1`
  font-weight: 500;
  font-size: 4rem;
  margin-bottom: 1rem;
  color: #333;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 32px;
  }

  span {
    color: #c2185b;
    font-weight: 300;

    &:last-child {
      font-weight: 700;
    }
  }
`;

const RulesText = styled.p`
  max-width: 600px;
  margin: 0 auto;
  text-align: start;
  color: #666;
  margin-bottom: 2rem;
  background: #d9d9d94d;
  padding: 0.75rem 1rem;
  border-radius: 8px;
`;

const RulesLink = styled.button`
  color: #c2185b;
  text-decoration: underline;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  font-size: inherit;
  margin-top: 0.5rem;
  font-family: "Outfit", sans-serif;
`;

const Form = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const FormGroup = styled.div`
  margin-bottom: 2rem;
  max-width: 100%;
  width: 100%;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  background: none;
  max-width: 100%;
  box-sizing: border-box;
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const CategoryOption = styled.div`
  border: 2px solid ${(props) => (props.selected ? "#C2185B" : "#ddd")};
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  background: ${(props) => (props.selected ? "#FFF1F5" : "#fff")};
  position: relative;
  background: #f3f3e9;

  &:hover {
    border-color: #c2185b;
  }
`;

const RadioInput = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
`;

const CategoryLabel = styled.label`
  display: block;
  cursor: pointer;
  padding-left: 2rem;
  position: relative;

  &:before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    border: 2px solid ${(props) => (props.selected ? "#C2185B" : "#ddd")};
    border-radius: 50%;
  }

  &:after {
    content: "";
    position: absolute;
    left: 7px;
    top: 50%;
    transform: translateY(-50%);
    width: 10px;
    height: 10px;
    background: #c2185b;
    border-radius: 50%;
    opacity: ${(props) => (props.selected ? 1 : 0)};
  }
`;

const StartButton = styled.button`
  background: #c2185b;
  color: #ffffff;
  padding: 8px 35px;
  border: none;
  border-radius: 4px;
  font-size: 1.5rem;
  cursor: pointer;
  width: 100%;
  max-width: 200px;
  display: block;
  font-family: "Outfit", sans-serif;

  &:hover {
    background: #a01346;
  }

  &:disabled {
    background: #b92b5d;
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  @media (max-width: 768px) {
      padding: 20px
    }
`;

const ModalContent = styled.div`
  background: white;
  padding: 0rem 2rem 0rem 2rem;
  border-radius: 8px;
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  right: 1rem;
  top: 1rem;
  background: #e6e6e6;
  border: none;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  color: #000000;
  font-weight: 700;
  font-family: "Outfit", sans-serif;
`;

const ModalTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #373052;
`;

const RulesSection = styled.div`
  border-radius: 4px;
`;

const RulesTitle = styled.h3`
  color: #333;
  margin-bottom: 1rem;
  background: #f3f3e9;
  padding: 0.75rem;
  border-radius: 4px;
`;

const RulesList = styled.ul`
  list-style: none;
  padding: 0px 5px 8px 0;

  li {
    font-weight: 400;
    margin-bottom: 0.5rem;
    padding-left: 1.5rem;
    position: relative;

    &:before {
      content: "•";
      position: absolute;
      left: 7px;
      color: #000000;
    }
  }
`;

export function Welcome() {
  const { selectCategory, state, setUserName } = useQuiz();
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showRules, setShowRules] = useState(false);
  console.log("selectedCategory", selectedCategory);
  const handleStartQuiz = () => {
    const category = state.categories.find((c) => c.id === selectedCategory);
    console.log(category, "category");
    if (category) {
      setUserName(name);
      setShowRules(true);
    }
  };

  const handleCloseRules = () => {
    setShowRules(false);
    const category = state.categories.find((c) => c.id === selectedCategory);
    if (category) {
      selectCategory(category);
    }
  };

  return (
    <>
      <WelcomeText>
        Welcome to <span>QUIZ</span>
        <span>Mania</span>
      </WelcomeText>
      <RulesText>
        Please read all the rules about this quiz before you start.
        <br />
        <RulesLink onClick={() => setShowRules(true)}>Quiz rules</RulesLink>
      </RulesText>

      <Form>
        <FormGroup>
          <Label>Full name</Label>
          <Input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label>Please select topic to continue</Label>
          <CategoryGrid>
            {state.categories.map((category) => (
              <CategoryOption
                key={category.id}
                selected={selectedCategory === category.id}
                onClick={() => {
                  setSelectedCategory(category.id);
                }}
              >
                <RadioInput
                  type="radio"
                  name="category"
                  value={category.id}
                  checked={selectedCategory === category.id}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                />
                <CategoryLabel selected={selectedCategory === category.id}>
                  {category.name}
                </CategoryLabel>
              </CategoryOption>
            ))}
          </CategoryGrid>
        </FormGroup>

        <StartButton
          onClick={handleStartQuiz}
          disabled={!name || !selectedCategory}
        >
          Start Quiz
        </StartButton>
      </Form>

      {showRules && (
        <Modal>
          <ModalContent>
            <CloseButton onClick={handleCloseRules}>&times;</CloseButton>
            <ModalTitle>Quiz rules</ModalTitle>

            <RulesSection>
              <RulesTitle>10-Second Timer</RulesTitle>
              <RulesList>
                <li>Each question comes with a 10-second timer.</li>
                <li>
                  If you don't answer within the time limit, the app will
                  automatically move to the next question.
                </li>
              </RulesList>
            </RulesSection>

            <RulesSection>
              <RulesTitle>Manual Navigation</RulesTitle>
              <RulesList>
                <li>
                  You can navigate to the next question manually before the
                  timer expires.
                </li>
                <li>
                  Use the "Next" button to move ahead if you're ready before the
                  timer runs out.
                </li>
              </RulesList>
            </RulesSection>

            <RulesSection>
              <RulesTitle>Final Score and Performance Message</RulesTitle>
              <RulesList>
                <li>
                  After all questions are answered, your final score will be
                  displayed.
                </li>
                <li>
                  Based on your performance, you will receive a personalized
                  message:
                  <RulesList>
                    <li>Great job!: If you score above 80%.</li>
                    <li>Well done!: If you score between 60% and 80%.</li>
                    <li>Keep practicing!: If you score below 60%.</li>
                  </RulesList>
                </li>
              </RulesList>
            </RulesSection>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}
