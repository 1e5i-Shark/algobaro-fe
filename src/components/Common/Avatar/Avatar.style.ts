import { css, styled } from 'styled-components';

import { Shape, Size } from '@/types';

interface AvatarStyledProps {
  $size: Size;
  $shape: Shape;
  $isSelect?: boolean;
  $isShadow: boolean;
  $isPointer?: boolean;
  onClick?: (event: React.MouseEventHandler<HTMLElement>) => void;
}

export const AvatarWrapper = styled.div<AvatarStyledProps>`
  ${({ theme, $size, $isSelect, $shape, $isShadow }) => css`
    position: relative;
    box-sizing: border-box;
    display: inline-block;
    width: ${theme.size.icon[$size]};
    height: ${theme.size.icon[$size]};
    overflow: hidden;
    background-color: ${theme.color.background_primary};
    border: ${$isSelect
      ? `3px solid ${theme.color.primary_color}`
      : `1px solid ${theme.color.transparent_30}`};
    border-radius: ${theme.shape[$shape]};
    box-shadow: ${$isShadow &&
    (theme.mode === 'light'
      ? `0px 4px 8px ${theme.color.black_primary}20`
      : `0px 4px 8px #00000050`)};
  `}
`;

export const AvatarContainer = styled.div<
  Pick<AvatarStyledProps, '$isPointer' | 'onClick'>
>`
  ${({ $isPointer }) => css`
    position: relative;
    display: inline-block;
    cursor: ${$isPointer && 'pointer'};
  `}
`;

export const EditButtonWrapper = styled.div`
  position: absolute;
  right: -0.5rem;
  bottom: 0;
`;
