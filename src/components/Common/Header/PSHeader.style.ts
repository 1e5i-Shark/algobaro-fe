import styled, { css } from 'styled-components';

import { Row } from '@/styles/GlobalStyle';

const HeaderWrapper = styled.header`
  ${({ theme }) => css`
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: ${theme.FIXED_HEIGHT.HEADER};
    padding: 0 2.5rem;
    background-color: ${theme.color.background_menu};
    border-bottom: 1px solid
      ${theme.mode === 'light' ? theme.color.gray_20 : 'none'};
  `}
`;

const TimerWrapper = styled.div``;

const ButtonWrapper = styled(Row)`
  gap: 2rem;
  align-items: center;
`;

export { ButtonWrapper, HeaderWrapper, TimerWrapper };
