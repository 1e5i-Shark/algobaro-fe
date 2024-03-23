import styled from 'styled-components';
import { css } from 'styled-components';

const Wrapper = styled.div<{ $textLength: number }>`
  ${({ $textLength }) => css`
    display: flex;
    flex-shrink: 0;
    min-width: ${$textLength < 4 ? '4rem' : '7rem'};
    white-space: nowrap;
  `}
`;

export { Wrapper };
