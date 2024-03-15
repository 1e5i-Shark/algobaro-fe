import { AttachmentRounded } from '@mui/icons-material';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Icon } from '@/components';
import { SOCKET_TYPE } from '@/constants/socket';
import { useGetUuidRoom } from '@/hooks/Api/useRooms';
import { useCustomTheme } from '@/hooks/useCustomTheme';
import { ROOM_ROLE } from '@/pages/RoomPage/RoomPage.consts';
import * as S from '@/pages/RoomPage/RoomPage.style';
import { PATH } from '@/routes/path';
import useMessageStore from '@/store/MessageStore';
import useMyInfoStore from '@/store/MyInfoStore';
import useRoomStore from '@/store/RoomStore';
import { RoomMemberType } from '@/types/room';

import { findMyRoomData } from '../findMyRoomData';

interface TestInfoProps {
  className: string;
}

export default function TestInfo({ className }: TestInfoProps) {
  const { theme } = useCustomTheme();
  const { sendMessage } = useMessageStore();
  const { myInfo } = useMyInfoStore();
  const { roomData, myRoomData, setMyRoomData, setRoomData } = useRoomStore();
  const { timeLimit, problemLink, roomId, roomMembers } = roomData;

  const [isReady, setIsReady] = useState(myRoomData.ready);

  const navigate = useNavigate();

  const { data, isSuccess, refetch } = useGetUuidRoom(roomData.roomShortUuid);

  const isTestReady = useMemo(() => {
    const result = roomMembers.findIndex(member => member.ready === false);
    return result === -1 ? true : false;
  }, [roomMembers]);

  const calcTime = useMemo(() => {
    const hours = Math.floor(timeLimit / 60);
    const minutes = Math.floor(timeLimit % 60);

    return { hours, minutes };
  }, [timeLimit]);

  const changeMemberData = (newData: Partial<RoomMemberType>) => {
    const myIndex = roomMembers.findIndex(
      member => member.email === myInfo.email
    );

    if (myIndex === -1) return;

    const updatedData = [...roomMembers];
    updatedData[myIndex] = {
      ...updatedData[myIndex],
      ...newData,
    };

    setRoomData({ ...roomData, roomMembers: updatedData });
  };

  const changeReady = (ready: boolean) => {
    ready
      ? sendMessage(SOCKET_TYPE.ROOM.READY)
      : sendMessage(SOCKET_TYPE.ROOM.UNREADY);

    setIsReady(ready);
    refetch();
  };

  useEffect(() => {
    changeMemberData({ ready: isReady });
  }, [isReady]);

  useEffect(() => {
    if (isSuccess && data.response) {
      setRoomData(data.response);
      const myData = myInfo.email && findMyRoomData(roomMembers, myInfo.email);
      if (myData) {
        setMyRoomData(myData);
      }
    }
  }, [data]);

  const handleStartTest = () => {
    // Todo: problemSolve에서 해줄지 여기서 할지
    // sendMessage(SOCKET_TYPE.ROOM.START_CODING);
    navigate(`${PATH.PROBLEMSOLVE}/${roomId}`);
  };

  const handleClickLink = () => {
    if (!problemLink) return;

    window.open(problemLink, '_blank', 'noopener');
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
                <Icon
                  className="icon"
                  onClick={problemLink ? () => {} : undefined}
                >
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
              {calcTime.hours > 0 && <span>{calcTime.hours}시간 </span>}
              {calcTime.minutes > 0 && <span>{calcTime.minutes}분</span>}
            </td>
          </tr>
        </tbody>
      </S.TestInfoTable>
      {myRoomData.role === ROOM_ROLE.HOST ? (
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
      ) : isReady ? (
        <Button
          onClick={() => changeReady(false)}
          backgroundColor={theme.color.secondary_color}
        >
          준비 취소
        </Button>
      ) : (
        <S.WaitingButtonWrapper>
          <Button onClick={() => changeReady(true)}>테스트 준비</Button>
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
