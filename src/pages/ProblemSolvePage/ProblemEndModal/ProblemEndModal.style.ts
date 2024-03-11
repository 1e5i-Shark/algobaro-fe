import styled, { css } from 'styled-components';

import { Col } from '@/styles/GlobalStyle';

const Wrapper = styled(Col)`
  gap: 2rem;
  align-items: center;
  padding: 3rem;
`;

const InfoTitle = styled.span`
  display: inline;
`;

const ModalTitle = styled.span`
  ${({ theme }) => css`
    font-size: ${theme.size.L};
    font-weight: ${theme.fontWeight.bold};
    color: ${theme.color.black_primary};
  `}
`;

export { InfoTitle, ModalTitle, Wrapper };
