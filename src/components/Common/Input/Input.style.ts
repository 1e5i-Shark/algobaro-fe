import styled, { css } from 'styled-components';

import { Col, Row } from '@/styles/GlobalStyle';

interface InputWrapperProps {
  $width?: string;
  $height?: string;
}

interface InputProps {
  $isPassword?: boolean;
  $fontSize?: string;
  $borderRadius?: string;
  $borderColor?: string;
  $backgroundColor?: string;
  $isError?: boolean;
}

export const Wrapper = styled(Col)`
  position: relative;
  width: 100%;
`;

export const LabelText = styled.label`
  ${({ theme }) => css`
    padding: 0 0.2rem 0.5rem;
    font-size: 1.2rem;
    color: ${theme.color.gray_50};
  `}
`;

export const InputWrapper = styled(Row)<InputWrapperProps>`
  ${({ $width, $height }) => css`
    position: relative;
    width: ${$width};
    height: ${$height};
  `}
`;

export const Input = styled.input<InputProps>`
  ${({
    $isPassword,
    $fontSize,
    $borderRadius,
    $borderColor,
    $backgroundColor,
    $isError,
    theme,
  }) => css`
    width: 100%;
    padding: 0.4rem ${$isPassword ? '3.4rem' : '1rem'} 0.4rem 1rem;
    font-size: ${$fontSize};
    background-color: ${$backgroundColor};
    border: ${$isError
      ? `1px solid ${theme.color.red}`
      : $borderColor
        ? `1px solid ${$borderColor}`
        : 'none'};
    border-radius: ${$borderRadius};
  `}
`;

export const ToggleButtonWrapper = styled.button`
  position: absolute;
  top: 50%;
  right: 0.2rem;
  bottom: 0;
  padding: 0 0.8rem;
  transform: translateY(calc(-50% + 0.2rem));
`;
