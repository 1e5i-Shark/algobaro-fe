import { useEffect, useRef, useState } from 'react';

import { convertedTime } from '@/utils/timer';

import * as S from './DateBaseTimer.style';

interface DateBaseTimerProps {
  endDateISOString: string;
  endText?: string;
  setIsEnd?: (isEnd: boolean) => void;
}

export default function DateBaseTimer({
  endDateISOString,
  endText = '',
  setIsEnd,
}: DateBaseTimerProps) {
  const timer = useRef(0);
  const [remainingTime, setRemainingTime] = useState('');

  const getConvertedTime = function () {
    const now = new Date();
    const targetTime = new Date(endDateISOString);
    const difference = targetTime.getTime() - now.getTime();

    return convertedTime(difference);
  };

  const updateTimer = () => {
    const convertedTime = getConvertedTime();

    if (convertedTime !== null) {
      requestAnimationFrame(updateTimer);
    } else {
      setIsEnd?.(true);
    }

    setRemainingTime(convertedTime ?? endText);
  };

  useEffect(() => {
    timer.current = requestAnimationFrame(updateTimer);

    return () => cancelAnimationFrame(timer.current);
  }, [endDateISOString]);

  return (
    <S.Wrapper $textLength={remainingTime.length}>{remainingTime}</S.Wrapper>
  );
}
