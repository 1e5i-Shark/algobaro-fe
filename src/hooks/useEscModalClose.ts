import { RefObject, useEffect } from 'react';

/**
 * ESC 키로 모달을 닫는 커스텀 훅
 * @param closeHandler - {function} 모달을 닫는 handler 함수
 * @param isOpen - {boolean} 모달 open 상태
 * @param modalRef - {RefObject} 모달 컴포넌트 ref
 */
const useEscModalClose = (
  closeHandler: Function,
  isOpen: boolean,
  modalRef: RefObject<HTMLDivElement>
) => {
  // ESC key press handler 함수
  const handleEscKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeHandler();
    }
  };

  useEffect(() => {
    if (isOpen && modalRef) {
      document.addEventListener('keydown', handleEscKeyPress);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKeyPress);
    };
  }, [isOpen]);
};

export default useEscModalClose;
