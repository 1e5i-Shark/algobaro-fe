import { EditRounded } from '@mui/icons-material';
import { css, styled } from 'styled-components';

import { useCustomTheme } from '@/hooks/useCustomTheme';
import { Row } from '@/styles/GlobalStyle';

const IconWrapper = styled(Row)`
  ${({ theme }) => css`
    align-items: center;
    justify-content: center;
    width: 25px;
    height: 25px;
    background-color: ${theme.color.primary_color};
    border-radius: 50%;
  `}
`;

export default function EditButton() {
  const { theme } = useCustomTheme();

  return (
    <IconWrapper>
      <EditRounded
        sx={{
          color: theme.color.black_primary,
          fontSize: 18,
        }}
      />
    </IconWrapper>
  );
}
