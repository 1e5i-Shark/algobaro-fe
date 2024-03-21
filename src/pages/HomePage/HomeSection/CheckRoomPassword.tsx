import { UseMutateFunction } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import { Button, Input } from '@/components';
import { useCustomTheme } from '@/hooks/useCustomTheme';
import { ValidateEnterErrorProps } from '@/hooks/useValidateEnter';
import {
  ValidateEnterRequest,
  ValidateEnterResponse,
} from '@/services/Room/validateEnter';

interface CheckRoomPasswordProps {
  roomShortUuid: string;
  mutate: UseMutateFunction<
    ValidateEnterResponse,
    ValidateEnterErrorProps,
    ValidateEnterRequest,
    unknown
  >;
}

interface PasswordValues {
  passwordValue: string;
}

export default function CheckRoomPassword({
  roomShortUuid,
  mutate,
}: CheckRoomPasswordProps) {
  const { theme } = useCustomTheme();
  const { register, handleSubmit } = useForm<PasswordValues>({
    reValidateMode: 'onSubmit',
  });

  const onSubmit = (data: PasswordValues) => {
    const { passwordValue } = data;
    mutate({ roomShortUuid, password: passwordValue });
  };

  return (
    <div>
      <h1>비밀번호가 필요한 방입니다.</h1>
      <PasswordModalForm onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="passwordValue"
          register={register}
          type="password"
          placeholder="이곳에 비밀번호를 입력해 주세요."
          backgroundColor={
            theme.mode === 'light'
              ? theme.color.transparent_50
              : theme.color.gray_30
          }
        />
        <Button
          type="submit"
          width="100%"
        >
          입장
        </Button>
      </PasswordModalForm>
    </div>
  );
}

const PasswordModalForm = styled.form`
  padding: 0 1rem;
  margin-top: 8rem;

  & > :last-child {
    margin-top: 2rem;
  }
`;
