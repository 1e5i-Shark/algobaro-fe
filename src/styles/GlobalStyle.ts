import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    color: ${props => props.theme.text_primary_color};
  }

  html {
    font-size: 62.5%;
  }
  
  body {
    font-size: 1.6rem;
    background-color: ${props => props.theme.background_color};
  }
  
  ul, ol, li {
    padding: 0;
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
`;

export const Col = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
`;
