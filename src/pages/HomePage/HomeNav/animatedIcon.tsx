import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import styled, { css, keyframes } from 'styled-components';

// 회전 애니메이션 정의
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

// 애니메이션을 적용할 스타일드 컴포넌트 생성
const AnimatedIcon = styled(RefreshRoundedIcon)<{ $animate: boolean }>`
  transition: transform 0.35s;
  ${props =>
    props.$animate &&
    css`
      animation: ${rotate} 0.35s ease-in-out;
    `};
`;

export default AnimatedIcon;
