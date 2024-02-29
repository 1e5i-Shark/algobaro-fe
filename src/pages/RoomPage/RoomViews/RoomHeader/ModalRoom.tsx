import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button, CheckBox, Input } from '@/components';
import { useCustomTheme } from '@/hooks/useCustomTheme';
import * as S from '@/pages/RoomPage/RoomPage.style';
import { axiosAuthInstance } from '@/services/axiosInstance';
import useRoomStore from '@/store/Room';
import { AccessType } from '@/types/room';

interface ModalRoomProps {
  onClick: () => void;
}
interface InputProps {
  problemLink: string;
  timeLimit: number;
  password: string;
}

export default function ModalRoom({ onClick }: ModalRoomProps) {
  const { roomData, setRoomData } = useRoomStore();
  const { roomId, problemLink, timeLimit, password, roomAccessType } = roomData;

  const [isPrivate, setIsPrivate] = useState(
    roomAccessType === 'PRIVATE' ? true : false
  );

  const { theme } = useCustomTheme();
  const { register, handleSubmit } = useForm<InputProps>({
    defaultValues: {
      problemLink: problemLink ?? '',
      timeLimit: timeLimit ?? 60,
      password: password ?? '',
    },
  });

  const changeRoomInfo = async (id: number) => {
    const { title, startAt, problemPlatform, problemName, tags, roomLimit } =
      roomData;

    return await axiosAuthInstance.patch(`/v1/rooms/${id}`, {
      title,
      startAt,
      roomAccessType: isPrivate ? 'PRIVATE' : 'PUBLIC',
      problemLink,
      problemPlatform,
      problemName,
      password,
      roomLimit,
      tags,
      timeLimit,
    });
  };

  const mutation = useMutation(changeRoomInfo);

  const onSubmit: SubmitHandler<InputProps> = data => {
    const newPassword = () => {
      const newAccessType: AccessType = isPrivate ? 'PRIVATE' : 'PUBLIC';

      if (isPrivate) {
        return {
          password: data.password,
          roomAccessType: newAccessType,
        };
      } else {
        return {
          password: '',
          roomAccessType: newAccessType,
        };
      }
    };

    const newData = {
      ...newPassword(),
      problemLink: data.problemLink,
      timeLimit: data.timeLimit,
    };

    setRoomData({ ...roomData, ...newData });

    // Todo: api 연결 확인
    mutation.mutate(roomId);
    onClick();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const regex = /^[0-9]$/;
    if (!regex.test(event.key) && event.key !== 'Backspace') {
      event.preventDefault();
    }
    // if (['e', 'E', '+', '-'].includes(event.key)) {
    //   event.preventDefault();
    // }
  };

  const handleComplete = () => {
    handleSubmit(onSubmit)();
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
          type="number"
          onKeyDown={handleKeyDown}
          validation={{
            valueAsNumber: true,
          }}
          register={register}
        />
        <S.PasswordWrapper>
          <CheckBox
            checked={isPrivate}
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
          type="submit"
          width="30rem"
          onClick={handleComplete}
        >
          수정 완료
        </Button>
        <Button backgroundColor={theme.color.transparent_50}>취소</Button>
      </S.ModalButtonsWrapper>
    </S.ModalWrapper>
  );
}
