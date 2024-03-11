import { useState } from 'react';

import { Timer } from '@/components';

import * as S from './ProblemTimer.style';
interface TimerProps {
  minutes?: number;
  seconds?: number;
  openModal?: () => void;
}

export default function ProblemTimer({
  minutes = 0,
  seconds = 0,
  openModal,
}: TimerProps) {
  const [isEnd, setIsEnd] = useState(false);

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
    </S.Wrapper>
  );
}
