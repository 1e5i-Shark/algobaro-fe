import { useMemo } from 'react';

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
  [key: string]: any;
}

/**
 * @param src - 필수: 이미지 url
 * @param [alt="이미지"] - 이미지 대체 텍스트
 * @param width - 가로 너비, 100%의 경우 fill을 사용해주세요.
 * @param height - 세로 너비, 100%의 경우 fill을 사용해주세요.
 * @param shape - circle, square, round
 * @param [fill=false] - 부모 요소를 채웁니다. width, height 속성이 없을 때 fill을 사용합니다. 상위 요소는 relative 속성을 가집니다.
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
  const $isPointer = useMemo(() => {
    return onClick ? true : false;
  }, []);

  return (
    <ImageWrapper
      width={width}
      height={height}
      shape={shape}
      $isPointer={$isPointer}
      $fill={fill}
    >
      <img
        src={src}
        alt={alt}
        sizes={sizes}
        loading={!priority ? 'lazy' : undefined}
        decoding={!priority ? 'async' : undefined}
        object-fit={fill ? 'cover' : undefined}
        onClick={onClick}
        {...props}
      />
    </ImageWrapper>
  );
}
