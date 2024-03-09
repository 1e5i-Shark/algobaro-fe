import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button, CheckBox, Input } from '@/components';
import { useCustomTheme } from '@/hooks/useCustomTheme';
import * as S from '@/pages/RoomPage/RoomPage.style';
import useRoomStore from '@/store/Room';
import { AccessType } from '@/types/room';

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
  const { problemLink, timeLimit, password, roomAccessType } = roomData;

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

  // const { mutate: updateRoomMutate } = useMutation({
  //   mutationFn: updateRoom,
  //   onSuccess: () => {
  //     alert('mutation 방 수정 성공!');
  //   },
  // });

  const onSubmit: SubmitHandler<InputProps> = data => {
    const newPassword = () => {
      const newAccessType: AccessType = isPrivate ? 'PRIVATE' : 'PUBLIC';

      return {
        password: isPrivate ? data.password : '',
        roomAccessType: newAccessType,
      };
    };

    const newData = {
      ...newPassword(),
      problemLink: data.problemLink,
      timeLimit: data.timeLimit,
    };

    setRoomData({ ...roomData, ...newData });

    // Todo: 방 수정 API 테스트
    // updateRoomMutate({
    //   endPoint: `/${roomId}`,
    //   requestBody: {
    //     roomAccessType: isPrivate ? ROOM_ACCESS.PRIVATE : ROOM_ACCESS.PUBLIC,
    //     problemLink,
    //     timeLimit,
    //     ...(password && { password }),
    //   },
    // });

    alert('방 정보가 수정되었습니다');
    onClose();
  };

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
