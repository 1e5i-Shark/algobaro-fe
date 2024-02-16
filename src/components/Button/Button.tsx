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
  children: ReactNode;
}

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
      {children}
    </BaseButton>
  );
}
