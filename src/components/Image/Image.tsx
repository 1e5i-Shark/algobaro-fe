interface ImageProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  sizes?: string;
  shape?: string;
  priority?: boolean;
  fill?: boolean;
  onClick?: (event: React.MouseEvent<HTMLImageElement>) => void;
}

/**
 * @param src - 필수: 이미지 url
 * @param alt - 이미지 대체 텍스트
 * @param width - 가로 너비
 * @param height - 세로 너비
 * @param sizes - 미디어 조건을 달 수 있습니다. 예 "(max-width: 500px) 444px"
 * @param shape - circle, square, round
 * @param priority - 우선순위 true인 경우 lazy loading과 비동기 디코딩이 적용됩니다.
 * @param [fill=false] - 상위 요소를 채우는 속성. width, height 속성이 없을 때 fill을 사용합니다. 상위 요소는 relative 속성을 가집니다.
 * @param onClick - 마우스 클릭 이벤트
 */
export default function Image({
  src,
  alt = '이미지',
  width,
  height,
  sizes,
  shape = 'round',
  priority = false,
  fill = false,
  onClick,
  ...props
}: ImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      onClick={onClick}
      loading={!priority ? 'lazy' : undefined}
      decoding={!priority ? 'async' : undefined}
      sizes={sizes}
      {...props}
    />
  );
}
