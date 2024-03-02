import styled, { css } from 'styled-components';

export const WelcomePageWrapper = styled.div``;

export const DarkModeButtonContainer = styled.div`
  ${({ theme }) => css`
    width: fit-content;
    padding: ${theme.size.S};
    div {
      width: ${theme.size.full};
    }

    button {
      position: fixed;
      right: ${theme.size.M};
      bottom: ${theme.size.M};
    }
  `}
`;
