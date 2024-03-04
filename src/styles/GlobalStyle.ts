import styled, { createGlobalStyle } from 'styled-components';

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
    width: 1.5rem;
  }

  ::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.color.background_modal};
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.color.gray_50};
    border-radius: 1rem;
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
