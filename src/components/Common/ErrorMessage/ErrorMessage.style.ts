import styled, { css } from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 2.4rem;
`;

const ErrorMessage = styled.span`
  ${({ theme }) => css`
    position: absolute;
    padding: 0 0.2rem;
    font-size: 1.2rem;
    color: ${theme.color.red};
    transform: translateY(0.2rem);
  `}
`;

export { ErrorMessage, Wrapper };
