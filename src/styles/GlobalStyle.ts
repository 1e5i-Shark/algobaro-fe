import styled, { createGlobalStyle } from 'styled-components';
import { css } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    border: 0;
    -webkit-tap-highlight-color: transparent;
  }

  html,
  body,
  #root {
    height: 100%;
  }
  
  html {
    font-size: 62.5%;
  }
  
  body {
    font-family: "Pretendard Variable", "Apple SD Gothic Neo", "Noto Sans KR", sans-serif;
    font-size: 1.6rem;
    color: ${({ theme }) => theme.color.text_primary_color};
    background-color: ${({ theme }) => theme.color.background_primary};
  }
  
  ul, ol, li {
    list-style: none;
  }

  input {
    border: none;
    outline: none;
  }

  textarea {
    resize: none;
    border: none;
    outline: none;
  }

  button {
    cursor: pointer;
    background-color: transparent;
    border: none;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  ::-webkit-scrollbar {
    width: 1rem;
    height: 1rem;
  }

  ::-webkit-scrollbar-track {
    -webkit-appearance: none;
    &:hover {
      background-color: ${({ theme }) => theme.color.transparent_10};
      border-radius: 1rem;
    }
  }

  ::-webkit-scrollbar-thumb {
    min-height: 5rem;
    background-color: ${({ theme }) => theme.color.gray_50};
    border-radius: 1rem;
    &:hover {
      cursor: pointer;
      background-color: ${({ theme }) => theme.color.secondary_color};
    }
  }
  
  &::-webkit-scrollbar-button:vertical:start {
    display: block;
    height: 0.3rem;
  }

  &::-webkit-scrollbar-button:vertical:end {
    display: block;
    height: 0.3rem;
  }

  &::-webkit-scrollbar-button:horizontal:start {
    display: block;
    width: 0.2rem;
  }

  &::-webkit-scrollbar-button:horizontal:end {
    display: block;
    width: 0.2rem;
  }

  textarea::-webkit-scrollbar {
    width: 1em;
    max-height: 2rem;
}

`;

export const Col = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
`;
// 버튼 hover 시 트랜지션 효과를 일관성있게 적용하기 위해 분리했다.
export const ButtonHoverTransition = css`
  transition: transform 0.2s ease;
  &:not(:disabled):hover {
    transform: scale(1.03);
  }
`;
