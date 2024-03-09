import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { forwardRef, HTMLAttributes, useEffect } from 'react';
import { createPortal } from 'react-dom';

import {
  ModalBackground,
  ModalCloseButton,
  ModalContainer,
  ModalContent,
  ModalWrapper,
} from './Modal.style';

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  mode?: 'normal' | 'confirm';
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
      mode = 'normal',
      width = '50%',
      height = '50%',
      borderRadius = '1.5rem',
      isOpen = false,
      onClose,
      ...props
    },
    ref
  ) => {
    // modal이 떠 있을 땐 스크롤 막음
    // modal 닫히면 다시 스크롤 가능하도록 함
    useEffect(() => {
      document.body.style.overflow = isOpen ? 'hidden' : '';
      document.documentElement.style.height = isOpen ? '100vh' : '';
    }, [isOpen]);

    return createPortal(
      isOpen ? (
        <ModalWrapper ref={ref}>
          <ModalBackground onClick={mode === 'normal' ? onClose : undefined} />
          <ModalContainer
            width={width}
            height={height}
            $borderRadius={borderRadius}
            {...props}
          >
            {mode === 'normal' ? (
              <ModalCloseButton
                $coordinate={borderRadius}
                onClick={onClose}
              >
                <CloseRoundedIcon />
              </ModalCloseButton>
            ) : null}
            <ModalContent>{children}</ModalContent>
          </ModalContainer>
        </ModalWrapper>
      ) : null,
      document.body
    );
  }
);

export default Modal;
