import { cloneElement, HTMLAttributes, MouseEvent, ReactElement } from 'react';

import { useCustomTheme } from '@/hooks/useCustomTheme';
import { Size } from '@/types';

import { IconWrapper } from './Icon.style';

/**
 * @param [children] - 아이콘을 받습니다. 아이콘 이름을 컨벤션에 맞게끔 맨 뒤에 '-Rounded' 붙여주세요!
 * @param [color] - 아이콘 색상을 지정해줄 수 있습니다.
 * @param [size] - 아이콘의 크기를 지정해줄 수 있습니다.
 * @param [mode] - 테마를 설정할 수 있습니다. (ex - 라이트/다크모드)
 * @param [background = false] - 배경 여부를 결정합니다.
 * @param [backgroundSize] - 배경의 크기를 지정해줄 수 있습니다.
 * @param [onClick] - 마우스 클릭 핸들러 함수를 props로 받습니다.
 */

interface IconProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactElement;
  color?: string;
  size?: Size;
  background?: boolean;
  backgroundSize?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

export default function Icon({
  children,
  color = '',
  size = 'XS',
  background = false,
  backgroundSize = '3.6rem',
  onClick,
  ...props
}: IconProps) {
  const { theme } = useCustomTheme();

  const defaultColor = color || theme.color.gray_50;
  const defaultFontSize = theme.size.icon[size] || theme.size.icon.XS;

  const cloneIcon = cloneElement(children, {
    sx: {
      color: defaultColor,
      fontSize: defaultFontSize,
    },
  });

  return (
    <IconWrapper
      onClick={onClick}
      $background={background}
      $backgroundSize={backgroundSize}
      {...props}
    >
      {cloneIcon}
    </IconWrapper>
  );
}
