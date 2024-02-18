import styled, { keyframes, useTheme } from 'styled-components';

interface SpinnerProps {
  size?: string;
  color?: string;
}

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const SpinnerWrapper = styled.div<SpinnerProps>`
  display: inline-block;
  width: ${({ size, theme }) => size && theme.size[size]};
  height: ${({ size, theme }) => size && theme.size[size]};
  border: 2px solid ${({ color }) => color};
  border-top-color: transparent;
  border-radius: 50%;
  animation: ${spin} 0.7s ease-out infinite;
`;

export default function Spinner({ size = 'L', color }: SpinnerProps) {
  const theme = useTheme();
  return (
    <SpinnerWrapper
      size={size}
      color={color || theme.color.gradation}
    />
  );
}
