import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

import * as S from './Timer.style';

interface TimerProps {
  minutes?: number;
  seconds?: number;
  padLength?: number;
  openModal?: () => void;
  setIsEnd?: Dispatch<SetStateAction<boolean>>;
}

export const MS = 1000;
export const MINUTES_IN_MS = 60 * MS;

const convertedTime = (time: number, padLength: number) => {
  const minutes = Math.floor((time / MINUTES_IN_MS) % 60);
  const hours = Math.floor(time / (60 * MINUTES_IN_MS));
  const seconds = Math.floor((time / MS) % 60);

  const convertedMinutes = String(minutes).padStart(padLength, '0');
  const convertedSeconds = String(seconds).padStart(padLength, '0');

  if (hours > 0) {
    return `${hours}시간 ${convertedMinutes}분`;
  }

  if (minutes > 0) {
    return `${convertedMinutes}분 ${convertedSeconds}초`;
  }

  if (seconds > 0) {
    return `${convertedSeconds}초`;
  }
};

export default function Timer({
  minutes = 0,
  seconds = 0,
  padLength = 2,
  openModal,
  setIsEnd,
}: TimerProps) {
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
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
      setIsEnd?.(true);
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

  return <S.Wrapper>{convertedTime(timeLeft, padLength)}</S.Wrapper>;
}
