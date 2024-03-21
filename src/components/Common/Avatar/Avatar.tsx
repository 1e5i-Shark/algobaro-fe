import { useEffect, useState } from 'react';

import { useCustomTheme } from '@/hooks/useCustomTheme';
import { Shape, Size } from '@/types';

import {
  AvatarContainer,
  AvatarWrapper,
  EditButtonWrapper,
} from './Avatar.style';
import EditButton from './EditButton';

export interface AvatarProps {
  size?: Partial<Size>;
  shape?: Shape;
  src?: string;
  alt?: string;
  isSelect?: boolean;
  isShadow?: boolean;
  isEdit?: boolean;
  priority?: boolean;
  onClick?: (event: React.MouseEventHandler<HTMLElement>) => void;
}

/**
 * @param [size='S'] - XS, S, M, L, XL
 * @param [shape='circle'] - circle은 원형, square는 사각형, round는 둥근 사각형
 * @param src - 이미지 소스
 * [alt="avatar"] - 이미지 대체 텍스트
 * @param [isSelect=false] - true는 굵은 border 적용
 * @param [isShadow=true] - true는 그림자 적용
 * @param [isEdit=false] - true는 편집 아이콘 적용
 * @param priority - 우선순위 true인 경우 lazy loading과 비동기 디코딩이 적용됩니다.
 * @param onClick - 마우스 클릭 핸들러 함수
 */
export default function Avatar({
  src,
  size = 'S',
  shape = 'circle',
  alt = 'avatar',
  isSelect = false,
  isShadow = true,
  isEdit = false,
  priority = false,
  onClick,
  ...props
}: AvatarProps) {
  const { theme } = useCustomTheme();

  const [source, setSource] = useState(src);

  const isPointer = onClick ? true : false;

  useEffect(() => {
    setSource(src || `/assets/avatar-${theme.mode}.png`);
  }, [theme.mode, src]);

  const handleError = () => {
    setSource(`/assets/avatar-${theme.mode}.png`);
  };

  return (
    <AvatarContainer
      $isPointer={isPointer}
      onClick={onClick}
    >
      <AvatarWrapper
        $size={size}
        $shape={shape}
        $isSelect={isSelect}
        $isShadow={isShadow}
        {...props}
      >
        <img
          src={source || `/assets/avatar-${theme.mode}.png`}
          alt={alt}
          width="100%"
          height="100%"
          loading={!priority ? 'lazy' : 'eager'}
          decoding={!priority ? 'async' : 'auto'}
          onError={handleError}
          style={{
            objectFit: 'cover',
          }}
        />
      </AvatarWrapper>
      {isEdit && (
        <EditButtonWrapper>
          <EditButton />
        </EditButtonWrapper>
      )}
    </AvatarContainer>
  );
}
