import styled, { css } from 'styled-components';

interface IconWrapperProps {
  $background: boolean;
  $backgroundSize: string;
}

export const IconWrapper = styled.button<IconWrapperProps>`
  ${({ $background, $backgroundSize, theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${$background && $backgroundSize};
    height: ${$background && $backgroundSize};
    background-color: ${$background && theme.color.transparent_10};
    border-radius: ${$background ? '50%' : '0'};
    box-shadow: ${$background && '0 12px 20px -12px rgba(0, 0, 0, .35)'};

    &:hover {
      filter: brightness(90%);
    }
  `}
`;
