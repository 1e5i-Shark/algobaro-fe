import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

import * as S from './Timer.style';

interface TimerProps {
  minutes?: number;
  seconds?: number;
  padLength?: number;
  isStop?: boolean;
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

/**
 * hh시간 mm분 ss초 형태의 시간을 보여주는 Timer 컴포넌트
 * 분, 초 단위로 시간을 받아서 보여줍니다.
 * padLength를 통해 자릿수를 변경할 수 있습니다.
 * @param [minutes] - `옵션`
 * @param [seconds] - `옵션`
 * @param [padLength=2] - `옵션` 예시:) 01분 01초
 * @param [isStop] - `옵션` 타이머를 멈추고 싶을 때 사용합니다.
 * @param [openModal] - `옵션` 종료 후 모달을 열 때 사용합니다.
 * @param [setIsEnd] - `옵션` 타이머 시간이 종료됨을 알려줍니다.
 */

export default function Timer({
  minutes = 0,
  seconds = 0,
  padLength = 2,
  isStop = false,
  openModal,
  setIsEnd,
}: TimerProps) {
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(
    minutes * MINUTES_IN_MS + seconds * MS
  );

  useEffect(() => {
    if (isStop) return;

    if (timeLeft <= 0) {
      if (timer.current != null) {
        clearInterval(timer.current);
      }
      setTimeLeft(0);
      openModal?.();
      setIsEnd?.(true);
    }
  }, [timeLeft, isStop]);

  useEffect(() => {
    if (isStop) return;

    timer.current = setInterval(() => {
      setTimeLeft(prevTime => prevTime - MS);
    }, MS);

    return () => {
      if (timer.current != null) {
        clearInterval(timer.current);
      }
    };
  }, [isStop]);

  return <S.Wrapper>{convertedTime(timeLeft, padLength)}</S.Wrapper>;
}
