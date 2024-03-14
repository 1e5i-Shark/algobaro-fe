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

const ResultTitle = styled.span`
  ${({ theme }) => css`
    font-weight: ${theme.fontWeight.bold};
  `}
`;

const ResultWrapper = styled(Col)`
  ${({ theme }) => css`
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

const ResultText = styled.span`
  ${({ theme }) => css`
    height: 100%;
    font-size: 1.8rem;
    line-height: ${theme.size.XXL};
  `}
`;

const GuideText = styled.span`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    font-size: ${theme.size.M};
    color: ${theme.color.gray_50};
  `}
`;

export { GuideText, ResultText, ResultTitle, ResultWrapper, Wrapper };
