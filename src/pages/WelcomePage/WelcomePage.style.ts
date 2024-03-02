import styled, { css } from 'styled-components';

import { Col, Row } from '@/styles/GlobalStyle';

export const WelcomePageWrapper = styled.div`
  height: 100%;
`;

export const MainContainer = styled(Row)`
  gap: 15%;
  align-items: center;
  justify-content: center;
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

export const MainRightContainer = styled(Col)`
  ${({ theme }) => css`
    gap: ${theme.size.M};

    button {
      position: relative;
      width: 80%;
      svg {
        position: absolute;
        right: ${theme.size.XS};
        font-size: ${theme.size.L};
        color: ${theme.color.black_primary};
      }

      &:hover {
        filter: none;
      }
    }
  `}
`;

export const UserNameContainer = styled.div``;

export const UserNickName = styled.strong``;

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
      right: ${theme.size.XL};
      bottom: ${theme.size.XL};
    }
  `}
`;
