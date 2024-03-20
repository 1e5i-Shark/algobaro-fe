import styled from 'styled-components';
import { css } from 'styled-components';

import { Col, Row } from '@/styles/GlobalStyle';

const Wrapper = styled(Col)`
  gap: 4rem;
  min-width: 65rem;
  padding: 4rem 4rem 0rem;
`;

const Title = styled.p`
  ${({ theme }) => css`
    margin-bottom: 1.2rem;
    font-size: 2.3rem;
    font-weight: ${theme.fontWeight.semiBold};
  `};
`;

const BOJWrapper = styled.div`
  white-space: pre-line;
`;

const BOJGuideText = styled.p`
  ${({ theme }) => css`
    margin-top: 2.2rem;
    line-height: ${theme.size.XXL};
    color: ${theme.color.text_primary_color};
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
  Title,
  Wrapper,
};
