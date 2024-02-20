import { Checkbox } from '@mui/material';
import { ChangeEvent } from 'react';
import { useTheme } from 'styled-components';

import { CheckBoxWrapper, LabelText } from './CheckBox.style';

interface CheckBoxProps {
  name?: string;
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  size?: string;
  textColor?: string;
  backgroundColor?: string;
  fontSize?: string;
  fontWeight?: number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

/**
 * CheckBox 컴포넌트
 * @param [name='checkbox']
 * @param [label (optional)]
 * @param [checked=false]
 * @param [disabled=false]
 * @param [textColor=theme.color.text_primary_color]
 * @param [backgroundColor=theme.color.gray_50]
 * @param [fontSize='1.6rem']
 * @param [fontWeight=400]
 * @param [onChange (optional)] - (e: ChangeEvent<HTMLInputElement>) => void
 */

export default function CheckBox({
  name = 'checkbox',
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
  const theme = useTheme();

  const defaultSize = size || theme.size.L;
  const defaultBackgroundColor = backgroundColor || theme.color.gray_50;
  const defaultTextColor = textColor || theme.color.black_primary;

  return (
    <CheckBoxWrapper>
      <Checkbox
        id={name}
        name={name}
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
          htmlFor={name}
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
