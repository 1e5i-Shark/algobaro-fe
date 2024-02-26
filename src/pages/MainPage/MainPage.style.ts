import styled, { css } from 'styled-components';

const OutletWrapper = styled.div`
  ${({ theme }) => css`
    height: calc(100% - ${theme.FIXED_HEIGHT.HEADER});
    padding-top: ${theme.FIXED_HEIGHT.HEADER};
  `}
`;

export { OutletWrapper };
