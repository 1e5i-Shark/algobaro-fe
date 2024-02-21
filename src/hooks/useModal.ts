import { useEffect, useRef, useState } from 'react';

/**
 * Modal 관련 이벤트 함수 및 ref를 객체로 반환하는 커스텀 훅
 * @returns `modalRef` 대상 모달 ref
 * @returns `isOpen` 모달 open 상태
 * @returns `openModal` 모달 여는 함수
 * @returns `closeModal` 모달 닫는 함수
 */
const useModal = () => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  // 모달 여는 함수
  const openModal = () => {
    setIsOpen(true);
  };
  // 모달 닫는 함수
  const closeModal = () => {
    setIsOpen(false);
  };
  // ESC key press handler 함수
  const handleEscKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeModal();
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

  return { modalRef, isOpen, openModal, closeModal };
};

export default useModal;
