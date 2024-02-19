import { cloneElement, HTMLAttributes, MouseEvent, ReactElement } from 'react';

import { IconWrapper } from './Icon.style';

/**
 * @param [children] - 아이콘을 받습니다. 아이콘 이름을 컨벤션에 맞게끔 맨 뒤에 '-Rounded' 붙여주세요!
 * @param [color] - 아이콘 색상을 지정해줄 수 있습니다.
 * @param [size] - 아이콘의 크기를 지정해줄 수 있습니다.
 * @param [mode] - 테마를 설정할 수 있습니다. (ex - 라이트/다크모드)
 * @param [background] - 배경 여부를 결정합니다.
 * @param [backgroundSize] - 배경의 크기를 지정해줄 수 있습니다.
 * @param [onClick] - 마우스 클릭 핸들러 함수를 props로 받습니다.
 */

interface IconProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactElement;
  color?: string;
  size?: string;
  mode?: '' | 'light' | 'dark';
  background?: boolean;
  backgroundSize?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

export default function Icon({
  children,
  color = '#909090',
  size = '1.5rem',
  mode = '',
  background = false,
  backgroundSize = '2rem',
  onClick,
  ...props
}: IconProps) {
  const cloneIcon = cloneElement(children, {
    sx: { color, size },
  });

  return (
    <IconWrapper
      onClick={onClick}
      $mode={mode}
      $background={background}
      $backgroundSize={backgroundSize}
      {...props}
    >
      {cloneIcon}
    </IconWrapper>
  );
}
