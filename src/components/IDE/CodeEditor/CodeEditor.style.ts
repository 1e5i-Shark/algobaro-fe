import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  .react-codemirror2 {
    width: 100%;
    height: 100%;
  }

  .CodeMirror-linenumber {
    padding: 0.2rem !important;
  }

  .CodeMirror-lines {
    padding: 2rem 0;
  }

  .CodeMirror-line {
    padding: 0.2rem 0.6rem !important;
  }

  .remote-caret {
    position: absolute;
    display: inline;
    height: 1.6rem;
    border-left: ${({ theme }) => theme.color.black_primary};
    border-left-style: solid;
    border-left-width: 0.2rem;
  }

  .remote-caret > div {
    position: absolute;
    top: -2rem;
    display: inline;
    width: fit-content;
    padding: 0.2rem 0.4rem;
    font-size: 1.2rem;
    color: ${({ theme }) => theme.color.white_primary};
    white-space: nowrap;
    user-select: none;
    background-color: ${({ theme }) => theme.color.primary_color};
    border-radius: ${({ theme }) => theme.shape.round};
  }
`;

export { Wrapper };
