import styled, { css } from 'styled-components';

import { Col } from '@/styles/GlobalStyle';

const Wrapper = styled(Col)`
  ${({ theme }) => css`
    width: 100%;
    height: 100%;
    padding: 1.6rem 2rem;
    background-color: ${theme.color.background_editor};
  `}
`;

const TestCaseTitle = styled.span`
  ${({ theme }) => css`
    font-weight: ${theme.fontWeight.bold};
  `}
`;

const TestInputWrapper = styled(Col)`
  ${({ theme }) => css`
    justify-content: center;
    height: 100%;
    padding: 0.4rem 1rem;
    margin-top: 1rem;
    overflow: auto;
    color: ${theme.color.black_primary};
    white-space: pre-line;
    background-color: ${theme.color.gray_10};
    border: 0.1rem solid ${theme.color.gray_30};
    border-radius: ${theme.shape.round};
  `}
`;

const TestInput = styled.textarea`
  ${({ theme }) => css`
    height: 2.2rem;
    padding: 0 ${theme.size.L};
    overflow: auto;
    font: inherit;
    color: ${theme.color.black_primary};
    white-space: pre-line;
    vertical-align: middle;
    background-color: ${theme.color.gray_10};

    &::placeholder {
      font-size: 1.6rem;
      color: ${theme.color.gray_50};
    }
  `}
`;

export { TestCaseTitle, TestInput, TestInputWrapper, Wrapper };
