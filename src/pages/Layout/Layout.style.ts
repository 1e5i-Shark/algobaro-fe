import styled, { css } from 'styled-components';

import { Col } from '@/styles/GlobalStyle';

const OutletWrapper = styled(Col)`
  ${({ theme }) => css`
    width: 100%;
    height: calc(100% - ${theme.FIXED_HEIGHT.HEADER});
    padding-top: ${theme.FIXED_HEIGHT.HEADER};
  `}
`;

export { OutletWrapper };
