import { AttachmentRounded } from '@mui/icons-material';
import { useMutation } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Icon } from '@/components';
import { useCustomTheme } from '@/hooks/useCustomTheme';
import * as S from '@/pages/RoomPage/RoomPage.style';
import { PATH } from '@/routes/path';
import { axiosAuthInstance } from '@/services/axiosInstance';
import { RoomType } from '@/types/room';

interface TestInfoProps {
  data: RoomType;
}

export default function TestInfo({ data }: TestInfoProps) {
  const { timeLimit, problemLink, roomId } = data;
  // Todo: 참가자 상태에 따라 isReady 구현
  const isReady = true;

  const { theme } = useCustomTheme();
  const navigate = useNavigate();

  const calcTime = useMemo(() => {
    const hour = Math.floor(timeLimit / 60);
    const minute = Math.floor(timeLimit % 60);

    return { hour, minute };
  }, []);

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

  return (
    <S.TestInfoWrapper>
      <S.TestInfoTable className="TestInfoTable">
        <tbody>
          <tr>
            <td
              colSpan={2}
              onClick={() => window.open(problemLink, '_blank')}
            >
              <span className="row-content">
                <h4>문제링크</h4>
                <Icon className="icon">
                  <AttachmentRounded />
                </Icon>
              </span>
            </td>
          </tr>
          <tr>
            <td>
              <h4>제한시간</h4>
            </td>
            <td>
              {calcTime.hour}시간 {calcTime.minute}분
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
