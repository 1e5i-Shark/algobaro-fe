import { AttachmentRounded } from '@mui/icons-material';
import { useMutation } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Icon } from '@/components';
import { useCustomTheme } from '@/hooks/useCustomTheme';
import * as S from '@/pages/RoomPage/RoomPage.style';
import { PATH } from '@/routes/path';
import { axiosAuthInstance } from '@/services/axiosInstance';
import useMeStore from '@/store/Me';
import useRoomStore from '@/store/Room';
import { MemberType } from '@/types/room';

interface TestInfoProps {
  className: string;
  myRoomData: MemberType;
}

export default function TestInfo({ className, myRoomData }: TestInfoProps) {
  const { roomData, setRoomData } = useRoomStore();
  const { me } = useMeStore();
  const { timeLimit, problemLink, roomId, members } = roomData;

  const isTestReady = useMemo(() => {
    const result = members.findIndex(member => member.ready === false);
    return result === -1 ? true : false;
  }, [members]);

  const { theme } = useCustomTheme();
  const navigate = useNavigate();

  const calcTime = useMemo(() => {
    const hours = Math.floor(timeLimit / 60);
    const minutes = Math.floor(timeLimit % 60);

    return { hours, minutes };
  }, [timeLimit]);

  const startTest = async () => {
    const data = await axiosAuthInstance.post(`/v1/rooms/codes/${roomId}`);
    return data;
  };

  const changeMemberData = (newData: Partial<MemberType>) => {
    const myIndex = members.findIndex(member => member.id === me.id);

    const updatedData = [...members];
    updatedData[myIndex] = {
      ...updatedData[myIndex],
      ...newData,
    };

    setRoomData({ ...roomData, members: updatedData });
  };

  const mutation = useMutation(startTest);

  const handleStartTest = () => {
    mutation.mutate();
    navigate(`${PATH.PROBLEMSOLVE}/${roomId}`);
  };

  const handleClickLink = () => {
    if (!problemLink) return;

    window.open(problemLink, '_blank');
  };

  return (
    <S.TestInfoWrapper className={className}>
      <S.TestInfoTable
        className="TestInfoTable"
        $problemLink={problemLink}
      >
        <tbody>
          <tr>
            <td
              colSpan={2}
              onClick={handleClickLink}
            >
              <span className="row-content">
                <h4>문제링크</h4>
                <Icon className="icon">
                  <AttachmentRounded />
                </Icon>
                {!problemLink ? (
                  <span>문제를 설정해주세요</span>
                ) : (
                  <span>{problemLink.split('/').pop()}</span>
                )}
              </span>
            </td>
          </tr>
          <tr>
            <td>
              <h4>제한시간</h4>
            </td>
            <td>
              {calcTime.hours > 0 && <span>{calcTime.hours}시간</span>}
              {calcTime.minutes > 0 && <span>{calcTime.minutes}분</span>}
            </td>
          </tr>
        </tbody>
      </S.TestInfoTable>

      {myRoomData.role === 'HOST' ? (
        // HOST
        isTestReady ? (
          <Button onClick={handleStartTest}>테스트 시작</Button>
        ) : (
          <S.WaitingButtonWrapper>
            <Button disabled>대기중</Button>
            <S.Text
              $color={theme.color.gray_50}
              $padding="1rem 0 0 0"
            >
              모두 준비 완료되면 시작할 수 있습니다
            </S.Text>
          </S.WaitingButtonWrapper>
        )
      ) : // MEMBER
      myRoomData.ready ? (
        <Button
          onClick={() => changeMemberData({ ready: false })}
          backgroundColor={theme.color.green}
        >
          준비 완료
        </Button>
      ) : (
        <S.WaitingButtonWrapper>
          <Button onClick={() => changeMemberData({ ready: true })}>
            테스트 준비
          </Button>
          <S.Text
            $color={theme.color.gray_50}
            $padding="1rem 0 0 0"
          >
            모두 준비 완료되면 시작할 수 있습니다
          </S.Text>
        </S.WaitingButtonWrapper>
      )}
    </S.TestInfoWrapper>
  );
}
