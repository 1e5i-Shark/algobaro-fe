import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import { useState } from 'react';
import { FieldValues } from 'react-hook-form';

import { useTheme } from '@/hooks/useTheme';
import { InputProps } from '@/types/input';

import {
  BaseInput,
  InputErrorMessage,
  InputErrorWrapper,
  InputWrapper,
  LabelText,
  ToggleVisibilityButton,
} from './Input.style';

export default function Input<T extends FieldValues>({
  name,
  register,
  label,
  required = false,
  type = 'text',
  formState,
  validation,
  ...props
}: InputProps<T>) {
  const theme = useTheme();

  const [inputType, setInputType] = useState(type);
  const isPasswordType = inputType === 'password';

  const handleToggleType = () => {
    const updatedType = isPasswordType ? 'text' : 'password';
    setInputType(updatedType);
  };

  const inputError = formState?.errors[name];
  const inputErrorMessage = inputError && (inputError.message as string);

  const showErrorMessage = formState?.isSubmitted && inputErrorMessage;
  return (
    <InputWrapper>
      {label && <LabelText htmlFor={name}>{label}</LabelText>}
      <BaseInput
        type={inputType}
        {...register(name, {
          ...validation,
          required: required && '값이 입력되지 않았어요',
        })}
        autoComplete="true"
        $isError={!!showErrorMessage}
        {...props}
      />
      {type === 'password' && (
        <ToggleVisibilityButton
          type="button"
          tabIndex={-1}
          onClick={handleToggleType}
        >
          {isPasswordType ? (
            <VisibilityRoundedIcon
              sx={{ width: 20, height: 20, color: theme?.gray_50 }}
            />
          ) : (
            <VisibilityOffRoundedIcon
              sx={{ width: 20, height: 20, color: theme?.gray_50 }}
            />
          )}
        </ToggleVisibilityButton>
      )}
      {showErrorMessage && (
        <InputErrorWrapper>
          <InputErrorMessage>{inputErrorMessage}</InputErrorMessage>
        </InputErrorWrapper>
      )}
    </InputWrapper>
  );
}
