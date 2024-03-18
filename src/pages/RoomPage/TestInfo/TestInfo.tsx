import { AttachmentRounded } from '@mui/icons-material';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Icon, Spinner } from '@/components';
import { SOCKET_TYPE } from '@/constants/socket';
import { useCustomTheme } from '@/hooks/useCustomTheme';
import { ROOM_ROLE } from '@/pages/RoomPage/RoomPage.consts';
import * as S from '@/pages/RoomPage/RoomPage.style';
import { PATH } from '@/routes/path';
import useMessageStore from '@/store/MessageStore';
import useRoomStore from '@/store/RoomStore';

interface TestInfoProps {
  className: string;
}

export default function TestInfo({ className }: TestInfoProps) {
  const { theme } = useCustomTheme();
  const { sendMessage } = useMessageStore();
  const { roomData, myRoomData } = useRoomStore();
  const { roomShortUuid, timeLimit, problemLink, roomMembers } = roomData;

  const navigate = useNavigate();

  const [isReady, setIsReady] = useState(myRoomData.ready);
  const [isLoading, setIsLoading] = useState(false);

  const isTestReady = useMemo(() => {
    const result = roomMembers.findIndex(member => member.ready === false);

    return result === -1 ? true : false;
  }, [roomMembers]);

  const calcTime = useMemo(() => {
    const hours = Math.floor(timeLimit / 60);
    const minutes = Math.floor(timeLimit % 60);

    return { hours, minutes };
  }, [timeLimit]);

  // 중복 클릭을 막기 위한 스로틀링
  let timer = 0;
  const changeReady = (ready: boolean) => {
    setIsLoading(true);
    if (!timer) {
      timer = window.setTimeout(() => {
        ready
          ? sendMessage(SOCKET_TYPE.ROOM.READY)
          : sendMessage(SOCKET_TYPE.ROOM.UNREADY);

        setIsReady(ready);
        setIsLoading(false);

        timer = 0;
      }, 200);
    }
  };

  const handleStartTest = () => {
    // Todo: 백엔드 해결중
    // sendMessage(SOCKET_TYPE.ROOM.START_CODING);
    navigate(`${PATH.PROBLEMSOLVE}/${roomShortUuid}`);
  };

  const handleClickLink = () => {
    if (!problemLink) return;

    window.open(problemLink, '_blank', 'noopener,noreferrer');
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
          disabled={isLoading}
        >
          {isLoading ? (
            <Spinner color={theme.color.white_primary} />
          ) : (
            '준비 취소'
          )}
        </Button>
      ) : (
        <S.WaitingButtonWrapper>
          <Button
            onClick={() => changeReady(true)}
            disabled={isLoading}
          >
            {isLoading ? (
              <Spinner color={theme.color.white_primary} />
            ) : (
              '테스트 준비'
            )}
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
