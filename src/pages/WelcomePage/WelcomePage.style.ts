import styled, { css, keyframes } from 'styled-components';

import { Col, Row } from '@/styles/GlobalStyle';

export const WelcomePageWrapper = styled.div`
  ${({ theme }) => css`
    height: 100%;
    font-size: 1.8rem;

    @media ${theme.device.laptop} {
      font-size: 1.6rem;
    }
  `}
`;

export const MainContainer = styled(Row)`
  gap: 10rem;
  align-items: center;
  justify-content: center;
  max-width: 108rem;
  height: calc(100vh - 12rem);
  max-height: 100rem;
  margin: auto;

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

export const MainSubTitleText = styled.h3`
  ${({ theme }) => css`
    font-size: ${theme.size.XL};
    font-weight: ${theme.fontWeight.semiBold};

    @media ${theme.device.laptop} {
      font-size: 2.4rem;
    }
  `}
`;

export const MainSubList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

export const MainSubListItem = styled.li``;

export const MainRightContainer = styled(Col)`
  ${({ theme }) => css`
    gap: ${theme.size.M};

    button {
      position: relative;
      width: 100%;
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

export const UserNameContainer = styled.div`
  height: 2rem;
  margin-top: 8rem;
`;

export const UserNickName = styled.span`
  ${({ theme }) => css`
    font-weight: ${theme.fontWeight.semiBold};
  `}
`;

export const MoreDetailContainer = styled.div`
  ${({ theme }) => css`
    height: fit-content;
    white-space: pre-line;
    background: ${theme.color.background_start_gradation};
  `}
`;

const upAndDown = keyframes`
    0% {
      transform: translateY(0);
    }  
    50% {
      transform: translateY(2rem);
    } 
    100% {
      transform: translateY(0);
    }  
`;

export const MoreDetailTitle = styled.p`
  ${({ theme }) => css`
    position: relative;
    font-size: ${theme.size.XL};
    font-weight: ${theme.fontWeight.semiBold};
    animation: ${upAndDown} 2s ease-in-out infinite;
  `}
`;

export const MoreDetailList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10rem;
  max-width: 108rem;
  padding: 0rem 4rem;
  margin: 0 auto;
`;

export const DetailItem = styled.li`
  display: flex;
  flex-direction: row;
  gap: 5rem;
  height: 42rem;
  background: transparent;

  &:nth-child(2n-1) {
    flex-direction: row-reverse;
  }

  & img {
    width: 56rem;
    height: 32rem;
    object-fit: contain;
    background-color: #1e1b1a;
    border-radius: 1rem;
  }

  &:nth-child(1n + 4) {
    & img {
      background-color: #202431;
    }
  }

  @media ${({ theme }) => theme.device.tablet} {
    flex-direction: column;
    gap: 2rem;
    margin-bottom: 50px;

    &:nth-child(2n-1) {
      flex-direction: column;
      align-items: end;
    }

    & img {
      width: 56rem;
      height: 32rem;
      object-fit: contain;
      background-color: #1e1b1a;
      border-radius: 1rem;
    }

    &:nth-child(1n + 4) {
      & img {
        background-color: #202431;
      }
    }
  }
`;

export const DetailContents = styled(Col)``;

export const DetailTitle = styled.h1`
  margin-bottom: 2rem;
  font-size: 3.2rem;
  font-weight: 600;
`;

export const DetailDescriptionList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
`;

export const DetailDescriptionItem = styled.li`
  font-size: 1.8rem;
  letter-spacing: -0.04rem;
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
