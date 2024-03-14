import styled, { css } from 'styled-components';

import { Row } from '@/styles/GlobalStyle';

const Wrapper = styled(Row)`
  align-items: center;
`;

const TimeLeftWrapper = styled.div`
  ${({ theme }) => css`
    width: fit-content;
    padding: 1rem 2.5rem;
    color: ${theme.color.black_primary};
    background-color: ${theme.color.gray_20};
  `}
`;

const TimeLeftText = styled.span`
  margin-right: 0.6rem;
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

export {
  TimeLeftText,
  TimeLeftWrapper,
  TimeOverText,
  TimeStartButton,
  Wrapper,
};
