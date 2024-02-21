import styled, { css, keyframes } from 'styled-components';

import { Size } from '@/types';

interface StyledSpinnerProps {
  $size?: Size;
  $color?: string;
  $weight?: string;
}

const $spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const SpinnerContainer = styled.div<{ $zIndex: number }>`
  ${({ $zIndex }) => css`
    z-index: ${$zIndex};
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  `}
`;

export const SpinnerWrapper = styled.div<StyledSpinnerProps>`
  ${({ $size, $color, $weight, theme }) => css`
    width: ${$size && theme.size.icon[$size]};
    height: ${$size && theme.size.icon[$size]};
    border: ${`${$weight} solid ${$color}`};
    border-top-color: transparent;
    border-radius: 50%;
    animation: ${$spin} 0.7s linear infinite;
  `}
`;
