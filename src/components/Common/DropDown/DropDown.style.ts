import { HTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

interface DropDownWrapperProps extends HTMLAttributes<HTMLDivElement> {
  $width: string;
}

export const DropDownWrapper = styled.div<DropDownWrapperProps>`
  ${({ $width, theme }) => css`
    width: ${$width};
    background-color: ${theme.color.background_primary};
  `}
`;
