import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import PendingRoundedIcon from '@mui/icons-material/PendingRounded';
import SportsRoundedIcon from '@mui/icons-material/SportsRounded';

import { Icon } from '@/components';
import { useCustomTheme } from '@/hooks/useCustomTheme';
import { RoleType } from '@/types/room';

import * as S from './MemberCard.style';

interface StatusTagProps {
  role: RoleType;
}

export default function StatusTag({ role }: StatusTagProps) {
  const { theme } = useCustomTheme();

  const roleToText = {
    HOST: '방장',
    READY: '준비 완료',
    WAITING: '대기중',
  };

  return (
    <S.StatusWrapper>
      <S.StatusText
        $color={
          role === 'READY'
            ? theme.color.green
            : role === 'WAITING'
              ? theme.color.red
              : theme.color.text_primary_color
        }
      >
        {roleToText[role]}
      </S.StatusText>
      {role === 'HOST' ? (
        <Icon color={theme.color.text_primary_color}>
          <SportsRoundedIcon />
        </Icon>
      ) : role === 'READY' ? (
        <Icon color={theme.color.green}>
          <CheckCircleRoundedIcon />
        </Icon>
      ) : (
        <Icon color={theme.color.red}>
          <PendingRoundedIcon />
        </Icon>
      )}
    </S.StatusWrapper>
  );
}
