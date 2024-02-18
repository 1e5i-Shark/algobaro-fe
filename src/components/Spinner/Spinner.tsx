import styled, { keyframes, useTheme } from 'styled-components';

import { Size } from '@/types';

interface SpinnerProps {
  size?: Size;
  color?: string;
  weight?: string;
}

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const SpinnerContainer = styled.div<{ zIndex: number }>`
  z-index: ${({ zIndex }) => zIndex};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const SpinnerWrapper = styled.div<SpinnerProps>`
  width: ${({ size, theme }) => size && theme.size.icon[size]};
  height: ${({ size, theme }) => size && theme.size.icon[size]};
  border: ${({ color, weight }) => `${weight} solid ${color}`};
  border-top-color: transparent;
  border-radius: 50%;
  animation: ${spin} 0.7s linear infinite;
`;

/**
 * 로딩중에 사용되는 스피너입니다.
 * @param [size='XS'] - (선택) XS, S, M, L, XL
 * @param [color='secondary_color'] - (선택) 스피너 색상
 * @param [weight = '0.3rem'] - (선택) 아이콘 두께
 */
export default function Spinner({
  size = 'XS',
  color,
  weight = '0.3rem',
  ...props
}: SpinnerProps) {
  const theme = useTheme();

  const ZINDEX_SPINNER = 999;

  return (
    <SpinnerContainer zIndex={ZINDEX_SPINNER}>
      <SpinnerWrapper
        size={size}
        color={color || theme.color.secondary_color}
        weight={weight}
        title="spinner"
        {...props}
      />
    </SpinnerContainer>
  );
}
