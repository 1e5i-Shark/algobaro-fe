import styled, { keyframes, useTheme } from 'styled-components';

import { Size } from '@/types';

interface SpinnerProps {
  size?: Size;
  color?: string;
}

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const SpinnerWrapper = styled.div<SpinnerProps>`
  width: ${({ size, theme }) => size && theme.size.icon[size]};
  height: ${({ size, theme }) => size && theme.size.icon[size]};
  border: ${({ color }) => `0.3rem solid ${color}`};
  border-top-color: transparent;
  border-radius: 50%;
  animation: ${spin} 0.7s linear infinite;
`;

export default function Spinner({
  size = 'XS',
  color,
  ...props
}: SpinnerProps) {
  const theme = useTheme();

  return (
    <SpinnerContainer>
      <SpinnerWrapper
        size={size}
        color={color || theme.color.secondary_color}
        title="spinner"
        {...props}
      />
    </SpinnerContainer>
  );
}
