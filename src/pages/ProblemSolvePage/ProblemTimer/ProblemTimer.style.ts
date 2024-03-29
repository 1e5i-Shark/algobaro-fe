import styled, { css } from 'styled-components';

import { Row } from '@/styles/GlobalStyle';

const Wrapper = styled(Row)`
  align-items: center;
`;

const TimeLeftWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    padding: 1rem 0 1rem;
    color: ${theme.color.gray_30};
    white-space: nowrap;
  `}
`;

const TimeLeftText = styled.span`
  ${({ theme }) => css`
    margin-right: 0.6rem;
    font-weight: ${theme.fontWeight.semiBold};
    color: ${theme.color.red};
  `}
`;

const TimeOverText = styled.span`
  ${({ theme }) => css`
    font-weight: ${theme.fontWeight.semiBold};
    color: ${theme.color.red};
  `}
`;

const TimeStartButton = styled.button`
  ${({ theme }) => css`
    padding: 0 1rem;
    font-size: ${theme.size.M};
    color: ${theme.color.red};
  `}
`;

const TestButton = styled.button`
  ${({ theme }) => css`
    margin-left: 1rem;
    color: ${theme.color.text_primary_color};
  `}
`;

export {
  TestButton,
  TimeLeftText,
  TimeLeftWrapper,
  TimeOverText,
  TimeStartButton,
  Wrapper,
};
