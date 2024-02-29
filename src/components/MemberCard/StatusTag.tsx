import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import PendingRoundedIcon from '@mui/icons-material/PendingRounded';
import SportsRoundedIcon from '@mui/icons-material/SportsRounded';

import { Icon } from '@/components';
import { useCustomTheme } from '@/hooks/useCustomTheme';
import { RoleType } from '@/types/room';

import * as S from './MemberCard.style';

interface StatusTagProps {
  role: RoleType;
  ready: boolean;
}

export default function StatusTag({ role, ready }: StatusTagProps) {
  const { theme } = useCustomTheme();

  const statusToText = {
    HOST: '방장',
    MEMBER: (ready: boolean) => (ready ? '준비 완료' : '대기중'),
  };

  return (
    <S.StatusWrapper>
      <S.StatusText
        $color={
          role === 'HOST'
            ? theme.color.text_primary_color
            : ready
              ? theme.color.green
              : theme.color.red
        }
      >
        {role === 'HOST' ? statusToText[role] : statusToText[role](ready)}
      </S.StatusText>
      {role === 'HOST' ? (
        <Icon color={theme.color.text_primary_color}>
          <SportsRoundedIcon />
        </Icon>
      ) : ready ? (
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
