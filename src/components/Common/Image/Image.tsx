import { ImageNotSupportedRounded } from '@mui/icons-material';
import { useState } from 'react';

import { useCustomTheme } from '@/hooks/useCustomTheme';
import { Shape } from '@/types';

import { ImageWrapper } from './Image.style';

interface ImageProps {
  src: string;
  alt?: string;
  width?: string;
  height?: string;
  shape?: Shape;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  onClick?: (event: React.MouseEvent<HTMLImageElement>) => void;
}

/**
 * @param src - 필수: 이미지 url
 * @param [alt="이미지"] - 이미지 대체 텍스트
 * @param width - 가로 너비, 100%의 경우 fill을 사용해주세요.
 * @param height - 세로 너비, 100%의 경우 fill을 사용해주세요.
 * @param shape - circle, square, round
 * @param [fill=false] - 부모 요소를 채웁니다. width, height 속성이 없을 때 fill을 사용합니다.
 * @param sizes - 미디어 조건을 달 수 있습니다. 예 "(max-width: 500px) 444px"
 * @param priority - 우선순위 true인 경우 lazy loading과 비동기 디코딩이 적용됩니다.
 * @param onClick - 마우스 클릭 이벤트
 */
export default function Image({
  src,
  alt = '이미지',
  width,
  height,
  shape,
  fill = false,
  sizes,
  priority = false,
  onClick,
  ...props
}: ImageProps) {
  const [isError, setIsError] = useState(false);

  const { theme } = useCustomTheme();

  const iconColor =
    theme.mode === 'light' ? theme.color.gray_50 : theme.color.white_primary;

  const $isPointer = onClick ? true : false;

  return (
    <ImageWrapper
      $width={width}
      $height={height}
      $shape={shape}
      $isImageError={isError}
      $isPointer={$isPointer}
      $fill={fill}
    >
      {!isError ? (
        <img
          src={src}
          alt={alt}
          sizes={sizes}
          loading={!priority ? 'lazy' : 'eager'}
          decoding={!priority ? 'async' : 'auto'}
          object-fit={fill ? 'cover' : 'contain'}
          onError={() => setIsError(true)}
          onClick={onClick}
          {...props}
        />
      ) : (
        <ImageNotSupportedRounded sx={{ fontSize: 30, color: iconColor }} />
      )}
    </ImageWrapper>
  );
}
