import { useNavigate } from 'react-router-dom';

import { useCustomTheme } from '@/hooks/useCustomTheme';
import useModal from '@/hooks/useModal';
import { PATH } from '@/routes/path';

import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import ThemeModeToggleButton from '../ThemeModeToggleButton/ThemeModeToggleButton';
import * as S from './PSHeader.style';

export default function PSHeader() {
  const { theme } = useCustomTheme();
  const { modalRef, isOpen, openModal, closeModal } = useModal();

  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate(PATH.HOME);
  };

  const handleGiveUp = () => {
    openModal();
  };

  return (
    <S.HeaderWrapper>
      <S.TimerWrapper>타이머</S.TimerWrapper>
      <S.ButtonWrapper>
        <ThemeModeToggleButton />

        <Button
          height="4rem"
          backgroundColor={theme.color.red}
          onClick={handleGiveUp}
        >
          포기하기
        </Button>
      </S.ButtonWrapper>
      <Modal
        width="fit-content"
        height="20rem"
        ref={modalRef}
        isOpen={isOpen}
        onClose={closeModal}
      >
        <S.ConfirmModalWrapper>
          <S.ConfirmText>정말 포기하고 나가시겠습니까?</S.ConfirmText>
          <S.ConfirmButtonWrapper>
            <Button
              width="8rem"
              height="4rem"
              fontSize={theme.size.M}
              backgroundColor={theme.color.red}
              onClick={navigateToHome}
            >
              나가기
            </Button>
            <Button
              width="8rem"
              height="4rem"
              fontSize={theme.size.M}
              backgroundColor={theme.color.gray_20}
              onClick={closeModal}
            >
              취소
            </Button>
          </S.ConfirmButtonWrapper>
        </S.ConfirmModalWrapper>
      </Modal>
    </S.HeaderWrapper>
  );
}
