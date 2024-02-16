import CircularProgress from '@mui/material/CircularProgress';
import { ComponentProps, ReactNode } from 'react';

import { useTheme } from '@/hooks/useTheme';

import { BaseButton } from './Button.style';

interface ButtonProps extends ComponentProps<'button'> {
  width?: string;
  height?: string;
  shape?: string;
  textColor?: string;
  backgroundColor?: string;
  fontSize?: string;
  fontWeight?: number;
  type?: 'submit' | 'reset' | 'button';
  disabled?: boolean;
  isLoading?: boolean;
  children: ReactNode;
}

/**
 * Button 컴포넌트
 * @param [width='13.3rem']
 * @param [height='4.3rem']
 * @param [shape='round'] - circle은 원형, square는 사각형, round는 둥근 사각형
 * @param [textColor=theme.text_primary_color]
 * @param [backgroundColor=theme.gradient]
 * @param [fontSize='1.8rem']
 * @param [fontWeight=700]
 * @param [type='button'] - submit | reset | button
 * @param [disabled=false]
 */

export default function Button({
  width = '13.3rem',
  height = '4.3rem',
  // 테마 리팩토링 적용되면 'round'로 변경 예정입니다.
  shape = '0.5rem',
  textColor,
  backgroundColor,
  fontSize = '1.8rem',
  fontWeight = 700,
  type = 'button',
  disabled = false,
  isLoading = false,
  children,
  ...props
}: ButtonProps) {
  const theme = useTheme();

  return (
    <BaseButton
      type={type}
      disabled={disabled}
      $width={width}
      $height={height}
      $shape={shape}
      $textColor={textColor || theme?.text_primary_color}
      $backgroundColor={backgroundColor || theme?.gradation}
      $fontSize={fontSize}
      $fontWeight={fontWeight}
      {...props}
    >
      {isLoading && <CircularProgress size={20} />}
      {!isLoading && children}
    </BaseButton>
  );
}
