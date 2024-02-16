import { styled } from 'styled-components';

import { Shape } from '@/types';

export const ImageWrapper = styled.div<{
  width?: string;
  height?: string;
  shape?: Shape;
  $isImageError: boolean;
  $isPointer: boolean;
  $fill: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ width, $fill }) => (!$fill ? width : '100%')};
  height: ${({ height, $fill }) => (!$fill ? height : '100%')};
  overflow: hidden;
  cursor: ${({ $isPointer }) => $isPointer && 'pointer'};
  background-color: ${({ theme, $isImageError }) =>
    !$isImageError
      ? theme.color.background_primary
      : theme.color.container_color};
  border-radius: ${({ shape, theme }) => shape && theme.shape[shape]};
`;
