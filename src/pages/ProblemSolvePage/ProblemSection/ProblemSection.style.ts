import styled, { css } from 'styled-components';

import { Col } from '@/styles/GlobalStyle';

const ProblemWrapper = styled(Col)`
  ${({ theme }) => css`
    height: 100%;
    padding: 2rem;
    background-color: ${theme.color.background_editor};
  `}
`;

const ProblemTextWrapper = styled.li`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    word-break: keep-all;
    white-space: pre-line;
  `}
`;

const ProblemTitle = styled.span`
  ${({ theme }) => css`
    font-size: ${theme.size.L};
    font-weight: ${theme.fontWeight.semiBold};
  `}
`;

const ProblemText = styled.span`
  ${({ theme }) => css`
    padding: 1rem 0 2rem;
    line-height: 3rem;
  `}
`;

const ProblemCode = styled.pre`
  ${({ theme }) => css`
    padding: 1rem;
    margin: 1rem 0 2rem;
    line-height: 3rem;
    color: ${theme.color.black_primary};
    background-color: ${theme.color.gray_10};
    border: 0.1rem solid ${theme.color.gray_30};
    border-radius: ${theme.shape.round};
  `}
`;

export {
  ProblemCode,
  ProblemText,
  ProblemTextWrapper,
  ProblemTitle,
  ProblemWrapper,
};
