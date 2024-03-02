import styled, { css } from 'styled-components';

import { Col, Row } from '@/styles/GlobalStyle';

export const WelcomePageWrapper = styled.div`
  height: 100%;
`;

export const MainContainer = styled(Row)`
  align-items: center;
  justify-content: space-evenly;
  height: 90vh;

  > :last-of-type {
    min-width: 30rem;
  }
`;

export const MainLeftContainer = styled(Col)`
  ${({ theme }) => css`
    gap: ${theme.size.M};
  `}
`;

export const MainTitleContainer = styled(Row)`
  ${({ theme }) => css`
    gap: ${theme.size.M};
    align-items: center;
  `}
`;

export const MainTitleText = styled.h1``;

export const MainSubTitleText = styled.h3``;

export const MainSubList = styled.ul``;

export const MainSubListItem = styled.li``;

export const MoreDetailContainer = styled.div`
  height: fit-content;
`;

export const MoreDetailTitle = styled.p`
  ${({ theme }) => css`
    padding-left: ${theme.size.XXL};
  `}
`;

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
