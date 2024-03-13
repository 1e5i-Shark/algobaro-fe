import styled, { css } from 'styled-components';

import { Col } from '@/styles/GlobalStyle';

const Wrapper = styled(Col)`
  ${({ theme }) => css`
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: ${theme.color.background_editor};
  `}
`;

export { Wrapper };
