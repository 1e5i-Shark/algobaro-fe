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

const ProblemLinkContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: end;
    padding: 0.5rem;
    background-color: ${theme.color.background_editor};
  `}
`;

const ProblemLinkText = styled.span`
  ${({ theme }) => css`
    font-weight: ${theme.fontWeight.semiBold};
  `}
`;

const ProblemLink = styled.a`
  ${({ theme }) => css`
    font-weight: ${theme.fontWeight.medium};
    cursor: pointer;
    &:hover {
      color: ${theme.color.gray_30};
    }
  `}
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
    background-color: ${theme.color.background_menu};
  `}
`;

export {
  ButtonWrapper,
  ContentsWrapper,
  EditorWrapper,
  ProblemLink,
  ProblemLinkContainer,
  ProblemLinkText,
  Wrapper,
};
