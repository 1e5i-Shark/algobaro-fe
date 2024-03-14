import { useEffect, useRef, useState } from 'react';

import { convertedTime, MINUTES_IN_MS, MS } from '@/utils/timer';

import * as S from './Timer.style';

interface TimerProps {
  minutes?: number;
  seconds?: number;
  padLength?: number;
  endText?: string;
  isStop?: boolean;
  openModal?: () => void;
  setIsEnd?: (isEnd: boolean) => void;
}

/**
 * hh시간 mm분 ss초 형태의 시간을 보여주는 Timer 컴포넌트
 * 분, 초 단위로 시간을 받아서 보여줍니다.
 * padLength를 통해 자릿수를 변경할 수 있습니다.
 * @param [minutes] - `옵션`
 * @param [seconds] - `옵션`
 * @param [padLength=2] - `옵션` 예시:) 01분 01초
 * @param [endText=시험 종료] - `옵션` 타이머가 끝났을 때 보여줄 문구
 * @param [isStop] - `옵션` 타이머를 멈추고 싶을 때 사용합니다.
 * @param [openModal] - `옵션` 종료 후 모달을 열 때 사용합니다.
 * @param [setIsEnd] - `옵션` 타이머 시간이 종료됨을 알려줍니다.
 */

export default function Timer({
  minutes = 0,
  seconds = 0,
  padLength = 2,
  endText = '',
  isStop = false,
  openModal,
  setIsEnd,
}: TimerProps) {
  const timer = useRef(0);

  const startDate = new Date();
  const targetMSTime = MINUTES_IN_MS * minutes + MS * seconds;
  const targetDate = new Date(startDate.getTime() + targetMSTime);

  const [remainingTime, setRemainingTime] = useState(
    convertedTime(targetMSTime, padLength) ?? endText
  );

  const getConvertedTime = function () {
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    return convertedTime(difference, padLength);
  };

  const updateTimer = () => {
    const convertedTime = getConvertedTime();

    if (convertedTime !== null) {
      requestAnimationFrame(updateTimer);
    } else {
      setIsEnd?.(true);
      openModal?.();
    }

    setRemainingTime(convertedTime ?? endText);
  };

  useEffect(() => {
    if (isStop) return;

    timer.current = requestAnimationFrame(updateTimer);

    return () => cancelAnimationFrame(timer.current);
  }, [isStop]);

  return <S.Wrapper>{remainingTime}</S.Wrapper>;
}
