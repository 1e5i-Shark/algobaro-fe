import styled, { css } from 'styled-components';

const Wrapper = styled.span`
  ${({ theme }) => css`
    font-weight: ${theme.fontWeight.semiBold};
  `}
`;

export { Wrapper };
