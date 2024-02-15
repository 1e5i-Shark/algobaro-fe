import { EditRounded } from '@mui/icons-material';
import { styled } from 'styled-components';

import { useTheme } from '@/hooks/useTheme';
import { Row } from '@/styles/GlobalStyle';

const IconWrapper = styled(Row)`
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  background-color: ${({ theme }) => theme.primary_color};
  border-radius: 50%;
`;

export default function EditButton() {
  const theme = useTheme();

  return (
    <IconWrapper>
      <EditRounded
        color={theme?.primary_black}
        sx={{
          fontSize: 20,
        }}
      ></EditRounded>
    </IconWrapper>
  );
}
