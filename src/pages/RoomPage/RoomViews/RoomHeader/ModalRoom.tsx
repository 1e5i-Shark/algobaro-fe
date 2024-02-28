import { Button } from '@/components';
import { useCustomTheme } from '@/hooks/useCustomTheme';

interface ModalRoomProps {
  roomId: number;
}

export default function ModalRoom({ roomId }: ModalRoomProps) {
  const { theme } = useCustomTheme();

  return (
    <div>
      {roomId} 방 정보 수정 모달입니다
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Button onClick={() => alert('수정 완료!')}>수정 완료</Button>
        <Button
          backgroundColor={theme.color.transparent_50}
          onClick={() => alert('취소')}
        >
          취소
        </Button>
      </div>
    </div>
  );
}
