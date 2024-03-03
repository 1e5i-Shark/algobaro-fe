import { Pagination, Stack } from '@mui/material';

import { useCustomTheme } from '@/hooks/useCustomTheme';

import * as S from './HomeFooter.style';

export default function HomeFooter() {
  const { theme } = useCustomTheme();

  return (
    <S.FooterContainer>
      <Stack spacing={2}>
        <Pagination
          count={30}
          size="large"
          color="primary"
          //   color={theme.color.gradation}
        />
      </Stack>
    </S.FooterContainer>
  );
}
