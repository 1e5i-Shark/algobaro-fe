import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button, CheckBox, Input } from '@/components';
import { useCustomTheme } from '@/hooks/useCustomTheme';
import { ROOM_ACCESS } from '@/pages/RoomPage/RoomPage.consts';
import * as S from '@/pages/RoomPage/RoomPage.style';
import { updateRoom } from '@/services/Room/Room';
import useRoomStore from '@/store/RoomStore';

interface ModalRoomProps {
  onClose: () => void;
}
interface InputProps {
  problemLink: string;
  timeLimit: number;
  password: string;
}

export default function ModalRoom({ onClose }: ModalRoomProps) {
  const { theme } = useCustomTheme();
  const { roomData, setRoomData } = useRoomStore();
  const {
    roomId,
    problemLink,
    timeLimit,
    password,
    roomAccessType,
    roomLimit,
  } = roomData;
  const [newData, setNewData] = useState({});

  const [isPrivate, setIsPrivate] = useState(
    roomAccessType === 'PRIVATE' ? true : false
  );

  const { register, formState, handleSubmit } = useForm<InputProps>({
    defaultValues: {
      problemLink: problemLink ?? '',
      timeLimit: timeLimit ?? 60,
      password: password ?? '',
    },
  });

  const {
    data,
    isSuccess,
    isError,
    mutate: updateRoomMutate,
  } = useMutation({
    mutationFn: updateRoom,
  });

  const onSubmit: SubmitHandler<InputProps> = data => {
    const updateData = {
      timeLimit: data.timeLimit,
      problemLink: data.problemLink,
      roomAccessType: isPrivate ? ROOM_ACCESS.PRIVATE : ROOM_ACCESS.PUBLIC,
      ...(isPrivate === true && { password: data.password }),
    };

    setNewData(updateData);

    updateRoomMutate({
      path: `/${roomId}`,
      requestBody: {
        roomLimit,
        ...updateData,
      },
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setRoomData({ ...roomData, ...newData });

      alert('방 정보가 수정되었습니다');
      onClose();
    }
  }, [data]);

  if (isError) {
    alert('서버와의 통신에 오류가 있습니다. 잠시 후 다시 시도해주세요.');
    onClose();
  }

  const validateKeys = (
    event: React.KeyboardEvent,
    regex: RegExp,
    allowedKeys: string[]
  ) => {
    if (!regex.test(event.key) && !allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  };

  const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];

  const handleValidLink = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const regex = /^[a-z0-9.:/]$/;
    validateKeys(event, regex, allowedKeys);
  };

  const handleValidNumber = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const regex = /^[0-9]$/;
    validateKeys(event, regex, allowedKeys);
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
          onKeyDown={handleValidLink}
        />
        <Input
          label="제한시간(분)"
          name="timeLimit"
          type="number"
          onKeyDown={handleValidNumber}
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
              formState={formState}
              register={register}
            />
          )}
        </S.PasswordWrapper>
        <S.ModalButtonsWrapper>
          <Button
            type="submit"
            width="30rem"
          >
            수정하기
          </Button>
          <Button
            backgroundColor={theme.color.transparent_50}
            onClick={onClose}
          >
            취소
          </Button>
        </S.ModalButtonsWrapper>
      </S.FormWrapper>
    </S.ModalWrapper>
  );
}
