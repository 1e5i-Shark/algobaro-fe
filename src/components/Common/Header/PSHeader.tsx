import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { useCustomTheme } from '@/hooks/useCustomTheme';
import useModal from '@/hooks/useModal';
import ProblemTimer from '@/pages/ProblemSolvePage/ProblemTimer/ProblemTimer';
import { PATH } from '@/routes/path';

import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import ThemeModeToggleButton from '../ThemeModeToggleButton/ThemeModeToggleButton';
import * as S from './PSHeader.style';

export default function PSHeader() {
  const { theme } = useCustomTheme();
  const { modalRef, isOpen, openModal, closeModal } = useModal();
  const location = useLocation();
  const params = useParams();
  const { roomShortUuid } = params;

  const isProblemSolvePage =
    location.pathname.split('/')[1] === PATH.PROBLEMSOLVE.replace('/', '');

  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate(PATH.HOME);
  };

  const handleGiveUp = () => {
    openModal();
  };

  const handleNavigateToRoom = () => {
    navigate(`${PATH.ROOM}/${roomShortUuid}`);
  };

  return (
    <S.HeaderWrapper>
      <S.TimerWrapper>
        <ProblemTimer isProblemSolvePage={isProblemSolvePage} />
      </S.TimerWrapper>
      <S.ButtonWrapper>
        <ThemeModeToggleButton />
        <Button
          width="10rem"
          height="3.5rem"
          fontSize="1.4rem"
          backgroundColor={theme.color.gray_20}
          textColor={theme.color.gray_50}
          onClick={isProblemSolvePage ? handleGiveUp : handleNavigateToRoom}
        >
          {isProblemSolvePage ? '포기하기' : '리뷰 종료'}
        </Button>
      </S.ButtonWrapper>
      <Modal
        width="fit-content"
        height="18rem"
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
              textColor={theme.color.white_primary}
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
