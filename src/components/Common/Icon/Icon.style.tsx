import styled, { css } from 'styled-components';

interface IconWrapperProps {
  $hasOnClick: boolean;
  $background: boolean;
  $backgroundSize: string;
}

export const IconWrapper = styled.button<IconWrapperProps>`
  ${({ $background, $backgroundSize, $hasOnClick, theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${$background && $backgroundSize};
    height: ${$background && $backgroundSize};
    cursor: ${$hasOnClick ? 'pointer' : 'default'};
    background-color: ${$background && theme.color.transparent_10};
    border-radius: ${$background && '50%'};
    box-shadow: ${$background && '0px 2px 3px 0px rgba(10, 10, 10, .3)'};

    &:hover {
      filter: ${$hasOnClick && 'brightness(50%)'};
    }
  `}
`;
