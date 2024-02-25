import { AttachmentRounded } from '@mui/icons-material';

import { Button, Icon } from '@/components';
import { useCustomTheme } from '@/hooks/useCustomTheme';
import {
  TestInfoTable,
  TestInfoWrapper,
  Text,
  WaitingButtonWrapper,
} from '@/pages/RoomPage/RoomPage.style';
import { UpdateRoomType } from '@/types/room';

interface TestInfoProps {
  data: UpdateRoomType;
}

export default function TestInfo({ data }: TestInfoProps) {
  const { timer, problemLink } = data;
  const isReady = true;

  const { theme } = useCustomTheme();

  return (
    <TestInfoWrapper>
      <TestInfoTable className="TestInfoTable">
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
          <td>{timer}분</td>
        </tr>
      </TestInfoTable>
      {isReady ? (
        <Button onClick={() => alert('테스트 시작')}>테스트 시작</Button>
      ) : (
        <WaitingButtonWrapper>
          <Button
            onClick={() => alert('대기중')}
            disabled
          >
            대기중
          </Button>
          <Text
            $color={theme.color.gray_50}
            $padding="1rem 0 0 0"
          >
            모두 준비 완료되면 시작할 수 있습니다
          </Text>
        </WaitingButtonWrapper>
      )}
    </TestInfoWrapper>
  );
}
