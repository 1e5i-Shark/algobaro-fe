import { PanelResizeHandle } from 'react-resizable-panels';
import styled, { css } from 'styled-components';

import { DirectionType } from './ResizeHandle';

interface ResizeHandleProps {
  $direction: DirectionType;
}

const ResizeHandleWrapper = styled(PanelResizeHandle)<ResizeHandleProps>`
  ${({ $direction, theme }) => css`
    position: relative;
    display: flex;
    flex-direction: column;
    width: ${$direction === 'horizontal' ? '0.2rem' : '100%'};
    height: ${$direction === 'horizontal' ? '100%' : '0.2rem'};
    padding: 1rem;
    background-color: ${theme.color.background_primary};
  `}
`;

const IconWrapper = styled.div<ResizeHandleProps>`
  ${({ $direction }) => css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%)
      rotate(${$direction === 'horizontal' ? '90deg' : '0'});
  `}
`;

export { IconWrapper, ResizeHandleWrapper };
