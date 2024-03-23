import {
  CheckCircleRounded,
  PendingRounded,
  SportsRounded,
} from '@mui/icons-material';

import { Icon } from '@/components';
import { useCustomTheme } from '@/hooks/useCustomTheme';
import { ROOM_ROLE } from '@/pages/RoomPage/RoomPage.consts';
import { RoleType } from '@/types/room';

import * as S from './MemberCard.style';

interface StatusTagProps {
  role: RoleType;
  ready: boolean;
}

export default function StatusTag({ role, ready }: StatusTagProps) {
  const { theme } = useCustomTheme();

  const convertStatus = (role: string, ready: boolean) => {
    if (role === ROOM_ROLE.HOST) return '방장';
    if (ready) return '준비 완료';
    return '대기중';
  };
  const status = convertStatus(role, ready);

  return (
    <S.StatusWrapper>
      <S.StatusText
        $color={
          role === ROOM_ROLE.HOST
            ? theme.color.text_primary_color
            : ready
              ? theme.color.green
              : theme.color.red
        }
      >
        {status}
      </S.StatusText>
      {role === ROOM_ROLE.HOST ? (
        <>
          <Icon color={theme.color.text_primary_color}>
            <SportsRounded />
          </Icon>
        </>
      ) : ready ? (
        <Icon color={theme.color.green}>
          <CheckCircleRounded />
        </Icon>
      ) : (
        <Icon color={theme.color.red}>
          <PendingRounded />
        </Icon>
      )}
    </S.StatusWrapper>
  );
}
