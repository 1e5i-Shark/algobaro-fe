import { useCustomTheme } from '@/hooks/useCustomTheme';
import { Size } from '@/types';

import { SpinnerContainer, SpinnerWrapper } from './Spinner.style';

interface SpinnerProps {
  size?: Size;
  color?: string;
  weight?: string;
}

/**
 * 로딩중에 사용되는 스피너입니다.
 * @param [size='XS'] - (선택) XS, S, M, L, XL
 * @param [color='secondary_color'] - (선택) 스피너 색상
 * @param [weight = '0.3rem'] - (선택) 아이콘 두께
 */
export default function Spinner({
  size = 'XS',
  color,
  weight = '0.3rem',
  ...props
}: SpinnerProps) {
  const { theme } = useCustomTheme();

  return (
    <SpinnerContainer $zIndex={theme.ZINDEX.SPINNER}>
      <SpinnerWrapper
        $size={size}
        $color={color || theme.color.secondary_color}
        $weight={weight}
        title="spinner"
        {...props}
      />
    </SpinnerContainer>
  );
}
