import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import { useEffect, useState } from 'react';
import { FieldValues } from 'react-hook-form';

import { useCustomTheme } from '@/hooks/useCustomTheme';
import { InputProps } from '@/types/input';

import {
  BaseInput,
  InputErrorMessage,
  InputErrorWrapper,
  InputWrapper,
  LabelText,
  ToggleVisibilityButton,
} from './Input.style';

/**
 * react-hook-form을 사용하는 공용 Input 컴포넌트
 * @param name - useForm에서 사용되는 value의 key (API 필드와 통일하기) 예) email, password
 * @param register - useForm의 register 함수
 * @param label - optional) input 상단의 text label. 예) 이메일, 비밀번호
 * @param required - optional) 필수 입력 여부
 * @param type - optional) text | email | password. default = text
 * @param formState - optional) validate 필요 시 사용. useForm의 formState
 * @param validation - optional) validate 필요 시 사용. validate 패턴과 errorMessage를 지정
 */
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
  const { theme } = useCustomTheme();

  const [inputType, setInputType] = useState(type);
  const isPasswordType = inputType === 'password';

  const handleToggleType = () => {
    const updatedType = isPasswordType ? 'text' : 'password';
    setInputType(updatedType);
  };

  const inputError = formState?.errors[name];
  const inputErrorMessage = inputError && (inputError.message as string);

  useEffect(() => {
    setInputType(type);
  }, [type]);

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
        $isError={!!inputErrorMessage}
        id={name}
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
              sx={{ width: 20, height: 20, color: theme.color.gray_50 }}
            />
          ) : (
            <VisibilityOffRoundedIcon
              sx={{ width: 20, height: 20, color: theme.color.gray_50 }}
            />
          )}
        </ToggleVisibilityButton>
      )}
      {inputErrorMessage && (
        <InputErrorWrapper>
          <InputErrorMessage>{inputErrorMessage}</InputErrorMessage>
        </InputErrorWrapper>
      )}
    </InputWrapper>
  );
}
