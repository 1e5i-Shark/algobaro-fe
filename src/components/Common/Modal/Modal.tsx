import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { HTMLAttributes, useRef } from 'react';
import { createPortal } from 'react-dom';

import useEscModalClose from '@/hooks/useEscModalClose';

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
  onClose: (openState: boolean) => void;
}

/**
 * Modal 컴포넌트
 * @param width - {string} 모달 너비 (optional)
 * @param height - {string} 모달 높이 (optional)
 * @param borderRadius - {string} 모서리 radius (optional)
 * @param isOpen - {boolean} 모달 open 상태를 컴포넌트 외부로 전달하기 위한 props
 * @param onClose - {function} 외부에 open 상태 전달하기 위한 함수
 */
export default function Modal({
  children,
  width = '50%',
  height = '50%',
  borderRadius = '1.5rem',
  isOpen = false,
  onClose,
  ...props
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  // 모달을 닫는 handler 함수
  const handleClose = () => {
    onClose(false);
  };

  // esc로 모달을 닫는 커스텀 훅
  useEscModalClose(handleClose, isOpen, modalRef);

  return createPortal(
    isOpen ? (
      <ModalWrapper ref={modalRef}>
        <ModalBackground onClick={handleClose} />
        <ModalContainer
          width={width}
          height={height}
          $borderRadius={borderRadius}
          {...props}
        >
          <ModalCloseButton
            $cooridinate={borderRadius}
            onClick={handleClose}
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
