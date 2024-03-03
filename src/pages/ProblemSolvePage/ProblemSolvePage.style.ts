import styled, { css } from 'styled-components';

import { Col, Row } from '@/styles/GlobalStyle';

const Wrapper = styled(Col)`
  width: 100%;
  height: 100%;
`;

const ContentsWrapper = styled(Row)`
  align-items: center;
  height: 100%;
`;

const ProblemWrapper = styled(Col)`
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const SolveWrapper = styled(Col)`
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const EditorWrapper = styled(Col)`
  ${({ theme }) => css`
    align-items: center;
    justify-content: center;
    height: 100%;
    background-color: ${theme.color.gray_50};
  `}
`;

const ExecutionWrapper = styled(Col)`
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const ButtonWrapper = styled(Row)`
  ${({ theme }) => css`
    gap: 2rem;
    align-items: center;
    justify-content: end;
    padding: 1.4rem 2.5rem;
    border-top: 2rem solid ${theme.color.background_menu};
  `}
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
