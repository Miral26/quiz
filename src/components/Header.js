import styled from "styled-components";
import { useQuiz } from "../context/QuizContext";
import LogoSvg from "../lib/svg/LogoSvg";

export function Header() {
  const { state, resetQuiz } = useQuiz();

  const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4rem;
    border-bottom: 1px solid #d9d9d9;
    padding: 30px 8%;
    @media (max-width: 768px) {
      margin-bottom: 0rem;
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
    background: #c2185b;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    text-transform: uppercase;
  `;

  const UserText = styled.span`
    color: #333;
  `;

  const ExitButton = styled.button`
    background: #f3f3e9;
    color: #b92b5d;
    border: 1px solid #b92b5d;
    padding: 8px 50px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 20px;
    font-family: "Outfit", sans-serif;

    &:hover {
      background: #ffe4ec;
    }
  `;
  return (
    <HeaderContainer>
      <LogoSvg />
      {state.isQuizComplete && (
        <UserName>
          <UserAvatar>{state.userName.charAt(0)}</UserAvatar>
          <UserText>{state.userName}</UserText>
        </UserName>
      )}
      {!state.isQuizComplete && state.selectedCategory && (
        <ExitButton onClick={resetQuiz}>Exit Quiz</ExitButton>
      )}
    </HeaderContainer>
  );
}
