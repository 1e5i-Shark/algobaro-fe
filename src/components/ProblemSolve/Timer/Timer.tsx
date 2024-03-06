import { useEffect, useRef, useState } from 'react';

import * as S from './Timer.style';
interface TimerProps {
  minutes?: number;
  seconds?: number;
  openModal?: () => void;
}

const MS = 1000;
const MINUTES_IN_MS = 60 * MS;

const convertedTime = (time: number) => {
  const minutes = Math.floor((time / MINUTES_IN_MS) % 60);
  const hours = Math.floor(time / (60 * MINUTES_IN_MS));
  const seconds = Math.floor((time / MS) % 60);

  const convertedMinutes = String(minutes).padStart(2, '0');
  const convertedSeconds = String(seconds).padStart(2, '0');

  if (hours > 0) {
    return `${hours}시간 ${convertedMinutes}분`;
  }

  if (minutes > 0) {
    return `${convertedMinutes}분 ${convertedSeconds}초`;
  }

  if (seconds > 0) {
    return `${convertedSeconds}초`;
  }

  return `시험 종료`;
};

export default function Timer({
  minutes = 0,
  seconds = 0,
  openModal,
}: TimerProps) {
  const timer = useRef<NodeJS.Timeout | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(
    minutes * MINUTES_IN_MS + seconds * MS
  );

  useEffect(() => {
    if (timeLeft <= 0) {
      if (timer.current != null) {
        clearInterval(timer.current);
      }
      setTimeLeft(0);
      openModal?.();
    }
  }, [timeLeft]);

  useEffect(() => {
    timer.current = setInterval(() => {
      setTimeLeft(prevTime => prevTime - MS);
    }, MS);

    return () => {
      if (timer.current != null) {
        clearInterval(timer.current);
      }
    };
  }, []);

  return (
    <S.Wrapper>
      <S.TimeLeftWrapper>
        <S.TimeLeftText>남은 시간</S.TimeLeftText>
        <S.TimerText>{convertedTime(timeLeft)}</S.TimerText>
      </S.TimeLeftWrapper>
    </S.Wrapper>
  );
}
