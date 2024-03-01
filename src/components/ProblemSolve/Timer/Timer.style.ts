import styled, { css } from 'styled-components';

import { Row } from '@/styles/GlobalStyle';

const Wrapper = styled(Row)`
  ${({ theme }) => css`
    width: fit-content;
    padding: 0.7rem 2.5rem;
    color: ${theme.color.black_primary};
    background-color: ${theme.color.gray_20};
    border-radius: 3rem;
  `}
`;

const LeftTimeWrapper = styled.span``;

const TimerText = styled.span`
  ${({ theme }) => css`
    margin-left: 0.6rem;
    font-weight: ${theme.fontWeight.semiBold};
  `}
`;

export { LeftTimeWrapper, TimerText, Wrapper };
