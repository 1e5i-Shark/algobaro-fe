import { styled } from 'styled-components';

import { Shape, Size } from '@/types';

interface AvatarStyledProps {
  size: Size;
  shape: Shape;
  src?: string;
  $isBorder: boolean;
  $isShadow: boolean;
  $isPointer?: boolean;
  onClick?: (event: React.MouseEventHandler<HTMLElement>) => void;
}

export const AvatarWrapper = styled.div<
  Omit<AvatarStyledProps, '$isPointer' | 'onClick'>
>`
  position: relative;
  box-sizing: border-box;
  display: inline-block;
  width: ${({ theme, size }) => theme.size.icon[size]};
  height: ${({ theme, size }) => theme.size.icon[size]};
  overflow: hidden;
  border: ${({ $isBorder, theme }) =>
    $isBorder ? `1px solid ${theme.color.transparent_30}` : 'none'};
  border-radius: ${({ theme, shape }) => theme.shape[shape]};
  box-shadow: ${({ $isShadow, theme }) =>
    $isShadow &&
    (theme.mode === 'light'
      ? `0px 4px 8px ${theme.color.black_primary}20`
      : `0px 4px 8px #00000050`)};
  &::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: '';
    background-color: ${({ theme }) => theme.color.background_primary};
    background-image: ${({ src, theme }) =>
      src
        ? `url(${src})`
        : theme.mode === 'light'
          ? 'url(src/assets/avatar-light.png)'
          : 'url(src/assets/avatar-dark.png)'};
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
`;

export const AvatarContainer = styled.div<
  Pick<AvatarStyledProps, '$isPointer' | 'onClick'>
>`
  position: relative;
  display: inline-block;
  cursor: ${({ $isPointer }) => $isPointer && 'pointer'};
`;

export const EditButtonWrapper = styled.div`
  position: absolute;
  right: -5px;
  bottom: 0px;
`;
