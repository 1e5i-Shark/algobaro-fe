import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { forwardRef, HTMLAttributes } from 'react';
import { createPortal } from 'react-dom';

import {
  ModalBackground,
  ModalCloseButton,
  ModalContainer,
  ModalContent,
  ModalWrapper,
} from './Modal.style';

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  width?: string;
  height?: string;
  borderRadius?: string;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Modal 컴포넌트
 * @param width - {string} 모달 너비 (optional)
 * @param height - {string} 모달 높이 (optional)
 * @param borderRadius - {string} 모서리 radius (optional)
 * @param isOpen - {boolean} 모달 open 상태 props
 * @param onClose - {function} 모달을 닫는 이벤트 handler 함수 props
 */
const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      children,
      width = '50%',
      height = '50%',
      borderRadius = '1.5rem',
      isOpen = false,
      onClose,
      ...props
    },
    ref
  ) => {
    return createPortal(
      isOpen ? (
        <ModalWrapper ref={ref}>
          <ModalBackground onClick={onClose} />
          <ModalContainer
            width={width}
            height={height}
            $borderRadius={borderRadius}
            {...props}
          >
            <ModalCloseButton
              $coordinate={borderRadius}
              onClick={onClose}
            >
              <CloseRoundedIcon />
            </ModalCloseButton>
            <ModalContent>{children}</ModalContent>
          </ModalContainer>
        </ModalWrapper>
      ) : null,
      document.body
    );
  }
);

export default Modal;
