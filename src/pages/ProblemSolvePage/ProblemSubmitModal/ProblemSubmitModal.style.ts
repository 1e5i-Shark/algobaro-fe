import styled from 'styled-components';
import { css } from 'styled-components';

import { Col, Row } from '@/styles/GlobalStyle';

const Wrapper = styled(Col)`
  gap: 4rem;
  min-width: 60rem;
  padding: 4rem 4rem 0rem;
`;

const Title = styled.p`
  ${({ theme }) => css`
    margin-bottom: 1.2rem;
    font-size: 2.3rem;
    font-weight: ${theme.fontWeight.semiBold};
  `};
`;

const TestResultWrapper = styled.div`
  height: 4rem;
  text-align: center;
  white-space: pre-line;
`;

const TestErrorText = styled.span`
  ${({ theme }) => css`
    line-height: ${theme.size.XXL};
    color: ${theme.color.red};
  `};
`;

const TestCaseWrapper = styled.div``;

const TestCaseList = styled.ul`
  display: flex;
  flex-direction: column;
`;

const TestCaseItem = styled.li`
  display: flex;
  align-items: center;
  height: 3rem;
`;

const LottieWrapper = styled(Row)`
  justify-content: center;
  width: 5rem;
`;

const TestCaseTitle = styled.p`
  ${({ theme }) => css`
    width: 8rem;
    font-size: 1.6rem;
    font-weight: ${theme.fontWeight.medium};
  `};
`;

const BOJWrapper = styled.div`
  white-space: pre-line;
`;

const BOJGuideText = styled.p`
  ${({ theme }) => css`
    margin-top: 2.2rem;
    line-height: ${theme.size.XXL};
    text-align: center;
  `};
`;

const BOJButtonWrapper = styled(Row)`
  justify-content: center;
  margin-top: 2rem;
  margin-bottom: 6rem;
`;

const EndButtonWrapper = styled(Row)`
  position: absolute;
  right: 2rem;
  bottom: 2rem;
  justify-content: end;
  margin-top: 4rem;
`;

export {
  BOJButtonWrapper,
  BOJGuideText,
  BOJWrapper,
  EndButtonWrapper,
  LottieWrapper,
  TestCaseItem,
  TestCaseList,
  TestCaseTitle,
  TestCaseWrapper,
  TestErrorText,
  TestResultWrapper,
  Title,
  Wrapper,
};
