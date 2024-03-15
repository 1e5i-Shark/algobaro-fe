import styled, { css } from 'styled-components';

import { Col, Row } from '@/styles/GlobalStyle';

const Wrapper = styled(Col)`
  width: 100%;
`;

const ContentsWrapper = styled(Row)`
  align-items: center;
  height: calc(100vh - 13rem);
  overflow: hidden;
`;

const EditorWrapper = styled(Col)`
  height: 100%;
`;

const ButtonWrapper = styled(Row)`
  ${({ theme }) => css`
    gap: 1.2rem;
    align-items: center;
    justify-content: end;
    height: ${theme.FIXED_HEIGHT.HEADER};
    padding: 1.4rem 2.5rem;
    background-color: ${theme.color.background_menu};
  `}
`;

export { ButtonWrapper, ContentsWrapper, EditorWrapper, Wrapper };
