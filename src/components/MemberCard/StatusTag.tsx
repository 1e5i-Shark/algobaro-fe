import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import PendingRoundedIcon from '@mui/icons-material/PendingRounded';
import SportsRoundedIcon from '@mui/icons-material/SportsRounded';

import { Icon } from '@/components';
import { useCustomTheme } from '@/hooks/useCustomTheme';

import * as S from './MemberCard.style';

interface StatusTagProps {
  status: string;
}

export default function StatusTag({ status }: StatusTagProps) {
  const { theme } = useCustomTheme();

  return (
    <S.StatusWrapper>
      <S.StatusText
        $color={
          status === '준비완료'
            ? theme.color.green
            : status === '대기중'
              ? theme.color.red
              : theme.color.text_primary_color
        }
      >
        {status}
      </S.StatusText>
      {status === '방장' ? (
        <Icon color={theme.color.text_primary_color}>
          <SportsRoundedIcon />
        </Icon>
      ) : status === '준비완료' ? (
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
