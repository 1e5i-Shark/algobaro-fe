import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Button, Input } from '@/components';

interface CheckRoomPasswordProps {
  roomPassword: string | undefined;
  roomShortUuid: string;
}

interface PasswordValues {
  passwordValue: string;
}

export default function CheckRoomPassword({
  roomPassword,
  roomShortUuid,
}: CheckRoomPasswordProps) {
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm<PasswordValues>({
    reValidateMode: 'onSubmit',
  });

  const onSubmit = (data: PasswordValues) => {
    const { passwordValue } = data;
    if (roomPassword === passwordValue) {
      navigate(`/room/${roomShortUuid}`);
    }
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
          formState={formState}
          validation={{
            validate: passwordValue =>
              roomPassword === passwordValue || '비밀번호가 일치하지 않습니다.',
          }}
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
