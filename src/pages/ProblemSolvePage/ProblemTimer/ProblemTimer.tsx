import { useState } from 'react';

import { Timer } from '@/components';
import useModal from '@/hooks/useModal';

import ProblemEndModal from '../ProblemEndModal/ProblemEndModal';
import * as S from './ProblemTimer.style';
interface TimerProps {
  minutes?: number;
  seconds?: number;
  openModal?: () => void;
}

export default function ProblemTimer({ minutes = 0, seconds = 0 }: TimerProps) {
  const [isEnd, setIsEnd] = useState(false);
  const { modalRef, isOpen, openModal, closeModal } = useModal();

  return (
    <S.Wrapper>
      <S.TimeLeftWrapper>
        {isEnd ? (
          <S.TimeOverText>시험 종료</S.TimeOverText>
        ) : (
          <S.TimeLeftText>남은 시간</S.TimeLeftText>
        )}
        <Timer
          minutes={minutes}
          seconds={seconds}
          openModal={openModal}
          setIsEnd={setIsEnd}
        />
      </S.TimeLeftWrapper>
      <ProblemEndModal
        modalRef={modalRef}
        isOpen={isOpen}
        closeModal={closeModal}
      />
    </S.Wrapper>
  );
}
