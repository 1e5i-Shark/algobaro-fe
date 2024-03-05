import styled, { css } from 'styled-components';

import { Row } from '@/styles/GlobalStyle';

const Wrapper = styled(Row)`
  position: relative;
  align-items: center;
`;

const Title = styled.span`
  font-size: 2rem;
  white-space: nowrap;
`;

const RequiredMark = styled.span`
  ${({ theme }) => css`
    margin: 0.6rem 0.6rem 0;
    color: ${theme.color.red};
  `}
`;

export { RequiredMark, Title, Wrapper };
