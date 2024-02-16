import styled from 'styled-components';

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
  }) => `
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0.8rem;
  
      width: ${$width};
      height: ${$height};
      border-radius: ${$shape};
      color: ${$textColor};
      background: ${$backgroundColor};
      font-size: ${$fontSize};
      font-weight: ${$fontWeight};
      box-shadow: 2px 4px 10px 0px rgba(0,0,0,0.1);
  
      &:disabled {
        cursor: default;
        opacity: 0.7;
      }

      &:focus {
        outline: none;
      }
      -webkit-tap-highlight-color: transparent;
    `}
`;
