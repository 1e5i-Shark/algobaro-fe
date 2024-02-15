import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { HTMLAttributes } from 'react';
import { createPortal } from 'react-dom';

import {
  ModalBackground,
  ModalCloseButton,
  ModalContainer,
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
  // 모달을 닫는 함수
  const handleClose = () => {
    onClose(false);
  };

  return createPortal(
    isOpen ? (
      <ModalWrapper>
        <ModalBackground onClick={handleClose} />
        <ModalContainer
          width={width}
          height={height}
          $borderRadius={borderRadius}
          {...props}
        >
          <ModalCloseButton
            cooridinate={borderRadius}
            onClick={handleClose}
          >
            <CloseRoundedIcon />
          </ModalCloseButton>
          {children}
        </ModalContainer>
      </ModalWrapper>
    ) : null,
    document.body
  );
}
