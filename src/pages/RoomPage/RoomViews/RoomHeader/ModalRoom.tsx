import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button, CheckBox, Input } from '@/components';
import { useCustomTheme } from '@/hooks/useCustomTheme';
import * as S from '@/pages/RoomPage/RoomPage.style';
import { axiosAuthInstance } from '@/services/axiosInstance';

interface ModalRoomProps {
  roomId: number;
  problemLink: string;
  timeLimit: number;
  password: string;
  roomAccessType: string;
}

interface InputProps {
  problemLink: string;
  timeLimit: number;
  password: string;
}

export default function ModalRoom({
  roomId,
  problemLink,
  timeLimit,
  password,
  roomAccessType,
}: ModalRoomProps) {
  const [isPrivate, setIsPrivate] = useState(
    roomAccessType === 'PRIVATE' ? true : false
  );

  const { theme } = useCustomTheme();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputProps>({
    defaultValues: {
      problemLink: problemLink ?? '',
      timeLimit: timeLimit ?? 60,
      password: password ?? '',
    },
  });

  const changeRoomInfo = async (id: number) => {
    return await axiosAuthInstance.patch(`/v1/rooms/${id}`, {
      title: '같이 푸실분~',
      introduce: '저랑 같이 A+B 문제 푸실 분 구해요',
      startAt: '2024-02-27T16:31:06.533Z',
      roomAccessType: '공개 방',
      problemLink: 'https://www.acmicpc.net/problem/1000',
      problemPlatform: '백준',
      problemName: 'A+B',
      password: 'password1234',
      roomLimit: 4,
      tags: ['Gold 4'],
      timeLimit: 20,
    });
  };

  const mutation = useMutation(changeRoomInfo);

  const onSubmit = (data: InputProps) => {
    console.log(data);
  };

  return (
    <S.ModalWrapper>
      <S.ModalHeader>방 정보 변경</S.ModalHeader>
      <S.FormWrapper onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder="예: https://www.acmicpc.net/problem/1"
          label="문제링크"
          name="problemLink"
          register={register}
        />
        <Input
          label="제한시간(분)"
          name="timeLimit"
          register={register}
        />
        <S.PasswordWrapper>
          <CheckBox
            label="비밀방"
            onChange={() => setIsPrivate(!isPrivate)}
          />
          {isPrivate && (
            <Input
              label="암호"
              name="password"
              type="password"
              register={register}
            />
          )}
        </S.PasswordWrapper>
      </S.FormWrapper>
      <S.ModalButtonsWrapper>
        <Button
          width="30rem"
          onClick={() => mutation.mutate(roomId)}
        >
          수정 완료
        </Button>
        <Button
          backgroundColor={theme.color.transparent_50}
          onClick={() => alert('취소')}
        >
          취소
        </Button>
      </S.ModalButtonsWrapper>
    </S.ModalWrapper>
  );
}
