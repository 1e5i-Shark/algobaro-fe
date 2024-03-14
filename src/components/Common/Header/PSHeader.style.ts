import styled, { css } from 'styled-components';

import { Col, Row } from '@/styles/GlobalStyle';

const HeaderWrapper = styled.header`
  ${({ theme }) => css`
    position: fixed;
    top: 0;
    left: 0;
    z-index: ${theme.ZINDEX.HEADER};
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: ${theme.FIXED_HEIGHT.HEADER};
    padding: 0 2rem;
    background-color: ${theme.color.background_primary};
    border-bottom: 1px solid
      ${theme.mode === 'light' ? theme.color.gray_20 : 'none'};
  `}
`;

const TimerWrapper = styled.div``;

const ButtonWrapper = styled(Row)`
  gap: 2rem;
  align-items: center;
`;

const ConfirmModalWrapper = styled(Col)`
  gap: 2rem;
  align-items: center;
  justify-content: center;
  padding: 2rem 4rem;
`;

const ConfirmText = styled.span`
  ${({ theme }) => css`
    font-weight: ${theme.fontWeight.semiBold};
  `}
`;

const ConfirmButtonWrapper = styled(Row)`
  gap: 2rem;
  align-items: center;
`;

export {
  ButtonWrapper,
  ConfirmButtonWrapper,
  ConfirmModalWrapper,
  ConfirmText,
  HeaderWrapper,
  TimerWrapper,
};
