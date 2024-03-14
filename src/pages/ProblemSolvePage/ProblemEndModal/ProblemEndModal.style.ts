import styled, { css } from 'styled-components';

import { Col } from '@/styles/GlobalStyle';

const Wrapper = styled(Col)`
  ${({ theme }) => css`
    gap: 2rem;
    align-items: center;
    padding: 3rem 6rem;
    color: ${theme.color.text_primary_color};
  `}
`;

const InfoTitle = styled.span`
  display: inline;
`;

const ModalTitle = styled.span`
  ${({ theme }) => css`
    font-size: ${theme.size.L};
    font-weight: ${theme.fontWeight.bold};
  `}
`;

export { InfoTitle, ModalTitle, Wrapper };
