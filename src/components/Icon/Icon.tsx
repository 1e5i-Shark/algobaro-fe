import * as Icons from '@mui/icons-material';

import { useTheme } from '@/hooks/useTheme';

import { IconWrapper } from './Icon.style';

/**
 * @param [name] - 아이콘 이름을 컨벤션에 맞게끔 맨 뒤에 '-Rounded' 붙여주세요!
 * @param [color] - 아이콘 색상을 지정해줄 수 있습니다.
 * @param [fontSize] - 아이콘의 크기를 지정해줄 수 있습니다.
 * @param [isShowBackground] - 아이콘의 배경을 보여줄지 말지 결정합니다. (ex - 라이트/다크모드 등)
 * @param [onIconClick] - 마우스 클릭 핸들러 함수
 */

interface IconProps {
  name: string;
  color?: string;
  fontSize?: number;
  isShowBackground?: boolean;
  onIconClick?: (event: React.MouseEventHandler<HTMLElement>) => void;
}

export default function Icon({
  name,
  color = '',
  fontSize = 16,
  isShowBackground = false,
  onIconClick,
  ...props
}: IconProps) {
  const theme = useTheme();
  const IconComponent = Icons[name + 'Rounded'];

  if (!IconComponent) {
    console.error('아이콘 컴포넌트에 잘못된 이름을 입력하였습니다. : ', name);
    return null;
  }

  return (
    <IconWrapper
      onClick={onIconClick}
      $isShowBackground={isShowBackground}
    >
      <IconComponent
        sx={{
          color: color || theme?.gray_50,
          fontSize,
          ...props,
        }}
      />
    </IconWrapper>
  );
}
