import { styled } from 'styled-components';

export type Shape = 'circle' | 'round' | 'square';
export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL';

export interface AvatarProps {
  size?: Size;
  shape?: Shape;
  src?: string;
  isBorder?: boolean;
  isShadow?: boolean;
  isEdit?: boolean;
  onClick?: (event: React.MouseEventHandler<HTMLElement>) => void;
}

const ShapeToStyle: { [key: string]: string } = {
  circle: '50%',
  round: '5px',
  square: '0px',
};

const SizeToStyle: { [key: string]: string } = {
  XS: '26px',
  S: '36px',
  M: '46px',
  L: '56px',
  XL: '66px',
};

export const AvatarWrapper = styled.div<{
  size?: Size;
  shape?: Shape;
  src?: string;
  $isBorder?: boolean;
  $isShadow?: boolean;
}>`
  position: relative;
  box-sizing: border-box;
  display: inline-block;
  width: ${({ size }) => size && SizeToStyle[size]};
  height: ${({ size }) => size && SizeToStyle[size]};
  overflow: hidden;
  border: ${({ $isBorder, theme }) =>
    $isBorder ? `1px solid ${theme.transparent_30}` : 'none'};
  border-radius: ${({ shape }) => shape && ShapeToStyle[shape]};
  box-shadow: ${({ $isShadow, theme }) =>
    $isShadow &&
    (theme.mode === 'light'
      ? `0px 4px 8px ${theme.black_primary}20`
      : `0px 4px 8px #00000050`)};
  &::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: '';
    background-color: ${({ theme }) => theme.background_primary};
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

export const AvatarContainer = styled.div<{
  $isPointer: boolean;
  onClick?: AvatarProps['onClick'];
}>`
  position: relative;
  display: inline-block;
  cursor: ${({ $isPointer }) => $isPointer && 'pointer'};
`;

export const EditButtonWrapper = styled.div`
  position: absolute;
  right: -5px;
  bottom: 0px;
`;
