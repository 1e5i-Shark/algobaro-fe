import styled, { css } from 'styled-components';

import { Col, Row } from '@/styles/GlobalStyle';

const Wrapper = styled(Col)`
  width: 100%;
`;

const ContentsWrapper = styled(Row)`
  align-items: center;
  height: calc(100vh - 13rem);
  overflow: hidden;
`;

const ProblemLinkContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: end;
    min-width: 40rem;
    height: ${theme.size.XXL};
    padding: 0.5rem;
    background-color: ${theme.color.background_editor};
  `}
`;

const ProblemLinkText = styled.span`
  ${({ theme }) => css`
    font-weight: ${theme.fontWeight.semiBold};
  `}
`;

const ProblemLink = styled.a`
  ${({ theme }) => css`
    font-weight: ${theme.fontWeight.medium};
    cursor: pointer;
    &:hover {
      color: ${theme.color.gray_30};
    }
  `}
`;

const EditorWrapper = styled(Col)`
  height: 100%;
`;

const ExecutionWrapper = styled(Row)`
  width: 100%;
  height: 100%;
`;

const ButtonWrapper = styled(Row)`
  ${({ theme }) => css`
    gap: 1.2rem;
    align-items: center;
    justify-content: end;
    height: ${theme.FIXED_HEIGHT.HEADER};
    padding: 1.4rem 2.5rem;
    background-color: ${theme.color.background_problem_solve};
  `}
`;

export {
  ButtonWrapper,
  ContentsWrapper,
  EditorWrapper,
  ExecutionWrapper,
  ProblemLink,
  ProblemLinkContainer,
  ProblemLinkText,
  Wrapper,
};
