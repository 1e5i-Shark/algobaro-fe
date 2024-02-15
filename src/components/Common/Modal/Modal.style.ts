import { HTMLAttributes } from 'react';
import styled from 'styled-components';

interface ModalContainerProps extends HTMLAttributes<HTMLDivElement> {
  width: string;
  height: string;
  $borderRadius: string;
}

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

export const ModalBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalContainer = styled.div<ModalContainerProps>`
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => props.width};
  height: ${props => props.height};
  background-color: ${({ theme }) => theme.background_modal};
  border-radius: ${props => props.$borderRadius};
  box-shadow: 0 0.4rem 1.6rem 0 rgba(0, 0, 0, 0.04);
`;

export const ModalCloseButton = styled.button<{ $cooridinate: string }>`
  position: absolute;
  top: ${props => props.$cooridinate};
  right: ${props => props.$cooridinate};
`;
