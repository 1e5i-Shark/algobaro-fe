import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    color: ${props => props.theme.text_primary_color};
  }
  html {
    font-size: 62.5%;
  }
  body {
    background-color: ${props => props.theme.background_color};
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
