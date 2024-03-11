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

const TimeLeftWrapper = styled.div``;

const TimeLeftText = styled.span`
  margin-right: 0.6rem;
`;

const TimeOverText = styled.span`
  ${({ theme }) => css`
    font-weight: ${theme.fontWeight.semiBold};
    color: ${theme.color.red};
  `}
`;

export { TimeLeftText, TimeLeftWrapper, TimeOverText, Wrapper };
