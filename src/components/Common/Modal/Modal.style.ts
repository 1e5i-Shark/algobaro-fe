import { HTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

interface ModalContainerProps extends HTMLAttributes<HTMLDivElement> {
  width: string;
  height: string;
  $borderRadius: string;
}

export const ModalWrapper = styled.div`
  ${({ theme }) => css`
    position: fixed;
    top: 0;
    left: 0;
    z-index: ${theme.ZINDEX.MODAL};
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  `}
`;

export const ModalBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalContainer = styled.div<ModalContainerProps>`
  ${({ theme, width, height, $borderRadius }) => css`
    position: relative;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${width};
    height: ${height};
    background-color: ${theme.color.background_modal};
    border-radius: ${$borderRadius};
    box-shadow: 0 0.4rem 1.6rem 0 rgba(0, 0, 0, 0.04);
  `}
`;

export const ModalCloseButton = styled.button<{ $coordinate: string }>`
  ${({ $coordinate }) => css`
    position: absolute;
    top: ${$coordinate};
    right: ${$coordinate};
    color: inherit;
  `}
`;

export const ModalContent = styled.div``;
