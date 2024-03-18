import styled from 'styled-components';
import { css } from 'styled-components';

const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: row;
    height: 100%;
    padding: 4rem 2rem;
    background-color: ${theme.color.background_editor};
  `}
`;

const CodeEditorContainer = styled.div`
  width: 150rem;
`;

const ChatContainer = styled.div`
  flex-grow: 1;
  max-width: 40rem;
`;

const CodeEditorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100% - 12rem);
  margin-top: 2rem;
`;

const SolveStatusWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: start;
    font-weight: ${theme.fontWeight.semiBold};
  `}
`;

const SolveSuccessText = styled.span`
  ${({ theme }) => css`
    padding: 1rem 1.2rem;
    background-color: ${theme.color.green};
    border-radius: ${theme.shape.round};
  `}
`;

const SolveFailText = styled.span`
  ${({ theme }) => css`
    padding: 1rem 1.2rem;
    background-color: ${theme.color.red};
    border-radius: ${theme.shape.round};
  `}
`;

const NoResultText = styled.span`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    margin-top: 5rem;
    font-size: ${theme.size.L};
    font-weight: ${theme.fontWeight.semiBold};
    color: ${theme.color.gray_50};
  `}
`;

export {
  ChatContainer,
  CodeEditorContainer,
  CodeEditorWrapper,
  NoResultText,
  SolveFailText,
  SolveStatusWrapper,
  SolveSuccessText,
  Wrapper,
};
