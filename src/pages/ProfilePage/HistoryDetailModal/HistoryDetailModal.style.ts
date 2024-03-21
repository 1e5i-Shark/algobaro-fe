import styled, { css } from 'styled-components';

import { Col, Row } from '@/styles/GlobalStyle';

const ModalInnerWrapper = styled(Col)`
  ${({ theme }) => css`
    gap: ${theme.size.S};
    padding-top: ${theme.size.M};
  `}
`;

const ModalTextContainer = styled(Row)`
  align-items: center;
`;

export const ModalName = styled.p`
  ${({ theme }) => css`
    position: absolute;
    top: ${theme.size.XXL};
    left: ${theme.size.XXL};
    font-size: ${theme.size.L};
    font-weight: ${theme.fontWeight.semiBold};
  `}
`;

const ModalTitle = styled.span`
  ${({ theme }) => css`
    font-weight: ${theme.fontWeight.semiBold};
  `}
`;

const ProblemLink = styled.a`
  ${({ theme }) => css`
    margin-left: ${theme.size.S};
    cursor: pointer;
    &:hover {
      color: ${theme.color.gray_30};
    }
  `}
`;

const ModalText = styled.span`
  ${({ theme }) => css`
    margin-left: ${theme.size.S};
  `}
`;

const SolveSuccessText = styled.span`
  ${({ theme }) => css`
    padding: 0.1rem 1.2rem;
    margin-left: ${theme.size.S};
    background-color: ${theme.color.green};
    border-radius: ${theme.shape.round};
  `}
`;

const SolveFailText = styled.span`
  ${({ theme }) => css`
    padding: 0.1rem 1.2rem;
    margin-left: ${theme.size.S};
    background-color: ${theme.color.red};
    border-radius: ${theme.shape.round};
  `}
`;

const ImageContainer = styled.div`
  ${({ theme }) => css`
    width: 2rem;
    height: 2rem;
    margin-left: ${theme.size.S};
  `}
`;

const NoCodeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 72rem;
  height: 30rem;
`;

export {
  ImageContainer,
  ModalInnerWrapper,
  ModalText,
  ModalTextContainer,
  ModalTitle,
  NoCodeContainer,
  ProblemLink,
  SolveFailText,
  SolveSuccessText,
};
