import { AttachmentRounded } from '@mui/icons-material';
import { useMutation } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Icon } from '@/components';
import { useCustomTheme } from '@/hooks/useCustomTheme';
import * as S from '@/pages/RoomPage/RoomPage.style';
import { PATH } from '@/routes/path';
import { axiosAuthInstance } from '@/services/axiosInstance';
import useRoomStore from '@/store/Room';

export default function TestInfo() {
  const { roomData } = useRoomStore();
  const { timeLimit, problemLink, roomId } = roomData;
  // Todo: 참가자 상태에 따라 isReady 구현
  const isReady = true;

  const { theme } = useCustomTheme();
  const navigate = useNavigate();

  const calcTime = useMemo(() => {
    const hours = Math.floor(timeLimit / 60);
    const minutes = Math.floor(timeLimit % 60);

    return { hours, minutes };
  }, [timeLimit]);

  // 테스트 시작
  const startTest = async () => {
    const data = await axiosAuthInstance.post(`/v1/rooms/codes/${roomId}`);
    return data;
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
    <S.TestInfoWrapper>
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
      {isReady ? (
        <Button onClick={handleStartTest}>테스트 시작</Button>
      ) : (
        <S.WaitingButtonWrapper>
          <Button
            onClick={() => alert('대기중')}
            disabled
          >
            대기중
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
