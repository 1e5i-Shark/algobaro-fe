import styled, { css } from 'styled-components';

interface StyledButtonProps {
  $width: string;
  $height: string;
  $shape: string;
  $textColor: string;
  $backgroundColor: string;
  $fontSize: string;
  $fontWeight: number;
}

export const BaseButton = styled.button<StyledButtonProps>`
  ${({
    $width,
    $height,
    $shape,
    $textColor,
    $backgroundColor,
    $fontSize,
    $fontWeight,
  }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${$width};
    height: ${$height};
    padding: 0.8rem;
    font-size: ${$fontSize};
    font-weight: ${$fontWeight};
    color: ${$textColor};
    background: ${$backgroundColor};
    border-radius: ${$shape};
    box-shadow: 2px 4px 10px 0px rgba(0, 0, 0, 0.1);

    &:disabled {
      color: ${({ theme }) => theme.color.gray_50};
      cursor: default;
      filter: saturate(0);
    }

    &:focus {
      outline: none;
    }
  `}
`;
