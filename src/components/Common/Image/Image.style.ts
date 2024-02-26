import { css, styled } from 'styled-components';

import { Shape } from '@/types';

interface ImageWrapperProps {
  $width?: string;
  $height?: string;
  $shape?: Shape;
  $isImageError: boolean;
  $isPointer: boolean;
  $fill: boolean;
}

export const ImageWrapper = styled.div<ImageWrapperProps>`
  ${({
    theme,
    $width,
    $height,
    $shape,
    $isImageError,
    $isPointer,
    $fill,
  }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${!$fill ? $width : '100%'};
    height: ${!$fill ? $height : '100%'};
    overflow: hidden;
    cursor: ${$isPointer && 'pointer'};
    background-color: ${!$isImageError
      ? theme.color.background_primary
      : theme.color.container_color};
    border-radius: ${$shape && theme.shape[$shape]};
  `}
`;
