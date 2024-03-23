import { Checkbox } from '@mui/material';
import { ChangeEvent } from 'react';

import { useCustomTheme } from '@/hooks/useCustomTheme';
import { Size } from '@/types';

import { CheckBoxWrapper, LabelText } from './CheckBox.style';

interface CheckBoxProps {
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  size?: Size;
  textColor?: string;
  backgroundColor?: string;
  fontSize?: string;
  fontWeight?: number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

/**
 * CheckBox 컴포넌트
 * @param [label (optional)]
 * @param [checked=false]
 * @param [disabled=false]
 * @param [size=theme.size.L]
 * @param [textColor=theme.color.text_primary_color]
 * @param [backgroundColor=theme.color.gray_50]
 * @param [fontSize='1.6rem']
 * @param [fontWeight=400]
 * @param [onChange (optional)] - (e: ChangeEvent<HTMLInputElement>) => void
 */

export default function CheckBox({
  label,
  checked = false,
  disabled = false,
  size,
  textColor,
  backgroundColor,
  fontSize = '1.6rem',
  fontWeight = 400,
  onChange,
}: CheckBoxProps) {
  const { theme } = useCustomTheme();

  const defaultSize = size || theme.size.L;
  const defaultBackgroundColor = backgroundColor || theme.color.gray_50;
  const defaultTextColor = textColor || theme.color.text_primary_color;

  return (
    <CheckBoxWrapper>
      <Checkbox
        id={label}
        name={label}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        sx={{
          width: defaultSize,
          height: defaultSize,
          color: defaultBackgroundColor,
          marginBottom: '0.2rem',
          '&.Mui-checked': {
            color: defaultBackgroundColor,
          },
          '& .MuiSvgIcon-root': { fontSize: defaultSize },
        }}
      />
      {label && (
        <LabelText
          htmlFor={label}
          $textColor={defaultTextColor}
          $fontSize={fontSize}
          $fontWeight={fontWeight}
        >
          {label}
        </LabelText>
      )}
    </CheckBoxWrapper>
  );
}
