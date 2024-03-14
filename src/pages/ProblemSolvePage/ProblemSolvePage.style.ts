import styled, { css } from 'styled-components';

import { Col, Row } from '@/styles/GlobalStyle';

const Wrapper = styled(Col)`
  width: 100%;
  height: 100%;
`;

const ContentsWrapper = styled(Row)`
  align-items: center;
  height: 100%;
`;

const EditorWrapper = styled(Col)`
  height: 100%;
`;

const ButtonWrapper = styled(Row)`
  ${({ theme }) => css`
    gap: 2rem;
    align-items: center;
    justify-content: end;
    padding: 1.4rem 2.5rem;
    background-color: ${theme.color.background_primary};
  `}
`;

export { ButtonWrapper, ContentsWrapper, EditorWrapper, Wrapper };
