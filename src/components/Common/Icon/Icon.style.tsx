import styled, { css } from 'styled-components';

interface IconWrapperProps {
  $mode: string;
  $background: boolean;
  $backgroundSize: string;
}

export const IconWrapper = styled.button<IconWrapperProps>`
  ${({ $mode, $background, $backgroundSize, theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${$background && $backgroundSize};
    height: ${$background && $backgroundSize};
    background-color: ${$background
      ? $mode === 'light'
        ? theme.color.white_primary
        : theme.color.transparent_10
      : 'none'};
    border-radius: ${$background ? '50%' : '0'};
    box-shadow: ${$mode && '0 12px 20px -12px rgba(0, 0, 0, .35)'};

    &:hover {
      filter: brightness(90%);
    }
  `}
`;
