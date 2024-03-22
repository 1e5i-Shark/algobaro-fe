import styled, { css, keyframes } from 'styled-components';

import { Col, Row } from '@/styles/GlobalStyle';

export const WelcomePageWrapper = styled.div`
  height: 100%;
`;

export const MainContainer = styled(Row)`
  gap: 5%;
  align-items: center;
  justify-content: center;
  height: 90vh;

  > :last-of-type {
    min-width: 30rem;
  }
`;

export const MainLeftContainer = styled(Col)`
  ${({ theme }) => css`
    gap: ${theme.size.L};
  `}
`;

export const MainTitleContainer = styled(Row)`
  ${({ theme }) => css`
    gap: ${theme.size.L};
    align-items: center;
    height: fit-content;
    padding-bottom: ${theme.size.M};
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
      width: 70%;
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
  ${({ theme }) => css`
    height: fit-content;
    background: ${theme.color.background_start_gradation};
  `}
`;

export const MoreDetailTitle = styled.p`
  padding-left: 5rem;
`;

export const MoreDetailList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10rem;
  padding: 10rem 15%;
`;

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(10%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideDown = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(10%);
  }
`;

export const DetailItem = styled.li`
  ${({ theme }) => css`
    display: flex;
    flex-direction: row;
    gap: ${theme.size.XL};
    height: 52rem;
    background: transparent;
    opacity: 0;

    &:nth-child(2n) {
      flex-direction: row-reverse;
    }

    &.visible {
      animation: ${slideUp} 1s ease-in-out forwards;
    }

    &.invisible {
      animation: ${slideDown} 1s ease-in-out forwards;
    }
  `}
`;

export const DetailContents = styled(Col)``;

export const DetailTitle = styled.h1``;
export const DetailDescription = styled.p``;

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
