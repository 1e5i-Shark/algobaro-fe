import styled, { css } from 'styled-components';

import { Col, Row } from '@/styles/GlobalStyle';

const Wrapper = styled(Col)`
  width: 100%;
  height: 100%;
  padding: 2rem 4rem;
`;

const ContentsWrapper = styled(Row)`
  gap: 1rem;
  align-items: center;
  height: 100%;
`;

const ProblemWrapper = styled(Col)`
  flex: 1;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const SolveWrapper = styled(Col)`
  flex: 1;
  gap: 1rem;
  align-items: center;
  height: 100%;
`;

const EditorWrapper = styled(Col)`
  ${({ theme }) => css`
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: ${theme.color.gray_50};
  `}
`;

const ExecutionWrapper = styled(Col)`
  min-height: 20rem;
`;

const ButtonWrapper = styled(Row)`
  gap: 2rem;
  align-items: center;
  justify-content: end;
  margin-top: 2.4rem;
`;

export {
  ButtonWrapper,
  ContentsWrapper,
  EditorWrapper,
  ExecutionWrapper,
  ProblemWrapper,
  SolveWrapper,
  Wrapper,
};
