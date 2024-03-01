import { useEffect, useState } from 'react';

import * as S from './Timer.style';
interface TimerProps {
  minutes?: number;
  seconds?: number;
  openModal?: () => void;
}

let interval: NodeJS.Timeout | null = null;
const MS = 1000;
const MINUTES_IN_MS = 60 * MS;

const convertToMin = (time: number) => {
  const minutes = Math.floor((time / MINUTES_IN_MS) % 60);
  const hours = Math.floor(time / (60 * MINUTES_IN_MS));

  const convertedMinutes = String(minutes).padStart(2, '0');
  if (hours > 0) {
    return `${hours}:${convertedMinutes}`;
  } else {
    return `${convertedMinutes}`;
  }
};

const converToSec = (time: number) => {
  return String(Math.floor((time / MS) % 60)).padStart(2, '0');
};

export default function Timer({
  minutes = 0,
  seconds = 0,
  openModal,
}: TimerProps) {
  const [timeLeft, setTimeLeft] = useState<number>(
    minutes * MINUTES_IN_MS + seconds * MS
  );

  useEffect(() => {
    if (timeLeft <= 0) {
      if (interval != null) {
        clearInterval(interval);
      }
      setTimeLeft(0);
      openModal?.();
    }
  }, [timeLeft]);

  useEffect(() => {
    interval = setInterval(() => {
      setTimeLeft(prevTime => prevTime - MS);
    }, MS);

    return () => {
      if (interval != null) {
        clearInterval(interval);
      }
    };
  }, []);

  return (
    <S.Wrapper>
      <S.LeftTimeWrapper>
        남은 시간
        <S.TimerText>
          {convertToMin(timeLeft)}:{converToSec(timeLeft)}
        </S.TimerText>
      </S.LeftTimeWrapper>
    </S.Wrapper>
  );
}
